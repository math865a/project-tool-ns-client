import { Activity, Interval } from "gantt-models";
import _ from "lodash";
import { action, computed } from "mobx";
import {
    Model,
    arrayActions,
    getRoot,
    model,
    modelAction,
    prop
} from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { defaultColors } from "~/src/design-system/controls/color-picker/defaultColors";
import { type ActivityJson, DeliveryJson, TaskJson } from "../../types";
import { generateId } from "~/util";
import { CreateActivityDto, UpdateActivityColorDto, UpdateActivityNameDto, UpdatePeriodDto } from "~/src/_definitions";

@model("activity-store")
export class ActivityStore extends Model({
    Activities: prop<Activity[]>(() => []).withSetter(),
}) {
    @computed
    get Deliveries() {
        return this.Activities.filter((d) => d.kind === "Delivery");
    }

    @computed
    get Transport() {
        return getRoot<Gantt>(this).Transport;
    }

    @computed
    get Plan() {
        return this.Activities.find((d) => d.kind === "Plan");
    }

    @computed
    get Rows() {
        return this.Activities.filter(
            (d) => d.kind !== "Plan" && d.Parent !== undefined
        );
    }

    @modelAction
    resolveMany(data: ActivityJson[]) {
        data.forEach(action((json) => this.resolve(json)));
    }

    @modelAction
    resolve(json: ActivityJson) {
        let Model = _.find(this.Activities, (d) => d.id === json.id);
        if (Model) {
            Model.update(json);
        } else {
            Model = this.createModel(json);
            this.Activities.push(Model);
        }
        return Model;
    }

    @modelAction
    deleteActivity = (Activity: Activity) => {
        Activity.Assignments.forEach((assignment) => assignment.remove());
        if (Activity.Parent) {
            Activity.Parent.removeChild(Activity.id);
        }
        if (Activity.Children.length > 0) {
            Activity.Children.forEach((Child) =>
                arrayActions.delete(
                    this.Activities,
                    _.indexOf(this.Activities, Child)
                )
            );
        }

        this.Activities.splice(_.indexOf(this.Activities, Activity), 1);
        getRoot<Gantt>(this).Table.api?.current.setRows(this.Rows);
        this.Transport.deleteActivity(Activity.id);
    };

    @modelAction
    removeActivity(Activity: Activity) {
        this.Activities.splice(_.indexOf(this.Activities, Activity), 1);
    }

    @modelAction
    createModel(json: ActivityJson) {
        return new Activity({
            ...json,
            // style: new ActivityStyle({ kind: activity.kind }),
            Interval: new Interval({
                start: json.startDate,
                end: json.endDate,
            }),
        });
    }

    @modelAction
    generateNewColor() {
        const existingColors = this.Deliveries.map((d) => d.color as string);
        const bucket = _.difference(defaultColors, existingColors);
        const color = _.sample(bucket);
        if (!color) {
            return defaultColors[
                _.sample(new Array(defaultColors.length - 1)) as number
            ];
        }
        return color;
    }

    @modelAction
    createDelivery = (sequence: number) => {
        if (!this.Plan) return null;
        const delivery: DeliveryJson = {
            id: generateId(),
            color: this.generateNewColor(),
            startDate: _.cloneDeep(this.Plan.Interval.start),
            endDate: _.cloneDeep(this.Plan.Interval.end),
            name: "Ny leverance",
            description: "",
            children: [],
            kind: "Delivery",
        };

        this.Plan.children.splice(sequence, 0, delivery.id);

        const dto: CreateActivityDto = {
            anchorId: "",
            properties: {
                id: delivery.id,
                name: delivery.name,
                description: delivery.description,
                color: delivery.color,
            },
            parent: {
                id: this.Plan.id,
                children: this.Plan.children,
            },
            kind: "Delivery",
        };

        this.Transport.createActivity(dto);
        return this.resolve(delivery);
    };

    @modelAction
    createTask(Parent: Activity, sequence: number) {
        const task = new TaskJson({
            id: generateId(),
            startDate: _.cloneDeep(Parent.Interval.start),
            endDate: _.cloneDeep(Parent.Interval.end),
        });

        Parent.addChild(task.id, sequence);

        const dto: CreateActivityDto = {
            anchorId: "",
            properties: {
                id: task.id,
                name: task.name,
                description: task.description,
            },
            parent: {
                id: Parent.id,
                children: Parent.children,
            },
            kind: "Task",
        };
        this.Transport.createActivity(dto);
        this.resolve(task);
    }


    @modelAction
    updatePeriod(id: string, Interval: Interval) {
        const dto = new UpdatePeriodDto(
            id,
            Interval.toDatabase.startDate,
            Interval.toDatabase.endDate
        );
        this.Transport.updatePeriod(dto);
    }

    @modelAction
    persistActivityName = (Activity: Activity) => {
        const dto: UpdateActivityNameDto = {
            activityId: Activity.id,
            name: Activity.name ?? "",
        };
        this.Transport.updateName(dto);
    };

    @modelAction
    persistColor(Activity: Activity) {
        if (Activity.kind !== "Delivery" || !Activity.color) return;
        const dto: UpdateActivityColorDto = {
            activityId: Activity.id,
            color: Activity.color,
        };
        this.Transport.updateColor(dto);
    }
}

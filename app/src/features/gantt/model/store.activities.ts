import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { CreateActivityDto } from "~/src/_definitions";
import { defaultColors, generateId } from "~/util";
import { ActivityJson, DeliveryJson, TaskJson } from "../types";
import { Activity } from "./activity/activity.model";
import { GanttStore } from "./store";
import { GanttTransport } from "./transport";

export class ActivityStore {
    GanttStore: GanttStore;
    Transport: GanttTransport;
    Activities: Activity[] = [];
    constructor(
        GanttStore: GanttStore,
        Transport: GanttTransport,
        data: ActivityJson[]

    ) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.GanttStore = GanttStore;
        this.Transport = Transport;
        this.resolveMany(data)

    }

    getActvitityById(id: string) {
        return this.Activities.find((a) => a.id === id);
    }

    getParent(childId: string) {
        return this.Activities.find((a) => a.children.includes(childId));
    }

    get Plan() {
        return this.Activities.find((a) => a.kind === "Plan");
    }

    get Deliveries() {
        return this.Activities.filter((a) => a.kind === "Delivery");
    }

    resolveMany(data: ActivityJson[]) {
        return data.map((activity) => this.resolve(activity));
    }

    resolve(data: ActivityJson) {
        let activity = this.getActvitityById(data.id);
        if (!activity) {
            activity = new Activity(this, data);
            this.Activities.push(activity);
        } else {
            activity.update(data);
        }
        return activity;
    }

    deleteActivity(Activity: Activity) {
        Activity.Assignments.forEach((assignment) => assignment.remove());
        if (Activity.Parent) {
            Activity.Parent.removeChild(Activity.id);
        }
        if (Activity.Children.length > 0) {
            Activity.Children.forEach((Child) => Child.remove());
        }

        this.Activities.splice(_.indexOf(this.Activities, Activity), 1);
        this.GanttStore.Gantt.Table.refreshRows();
        this.Transport.deleteActivity(Activity.id);
    }

    removeActivity(Activity: Activity) {
        this.Activities.splice(this.Activities.indexOf(Activity), 1);
    }

    generateColor() {
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

    createDelivery(sequence: number) {
        if (!this.Plan) return null;
        const delivery: DeliveryJson = {
            id: generateId(),
            color: this.generateColor(),
            startDate: this.Plan.Interval.start,
            endDate: this.Plan.Interval.end,
            name: "Ny leverance",
            description: "",
            children: [],
            kind: "Delivery",
        };

        this.Plan.addChild(delivery.id, sequence);

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
    }

    createTask(Parent: Activity, sequence: number) {
        const task = new TaskJson({
            id: generateId(),
            startDate: Parent.Interval.start,
            endDate: Parent.Interval.end,
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
}

import { ActivityType, DeliveryJson, PlanJson, TaskJson } from "../../types";
import _ from "lodash";
import { comparer, computed, reaction } from "mobx";
import {
    Model,
    detach,
    getRoot,
    idProp,
    model,
    modelAction,
    prop,
    rootRef,
} from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import {
    Interval,
    Assignment,
    TeamMember,
    ActivityAggregates,
    ActivityPeriod,
    Bar,
} from "gantt-models";

@model("activity")
export class Activity extends Model({
    id: idProp.typedAs<string>(),
    name: prop<string | undefined>(undefined).withSetter(),
    description: prop<string | undefined>(undefined).withSetter(),
    color: prop<string | undefined>(undefined).withSetter(),
    Interval: prop<Interval>(),
    children: prop<string[]>(() => []).withSetter(),
    kind: prop<ActivityType>(),
    Bar: prop<Bar>(() => new Bar({})),
    Aggregates: prop<ActivityAggregates>(() => new ActivityAggregates({})),
    Period: prop<ActivityPeriod>(() => new ActivityPeriod({})),
    isHovering: prop<boolean>(false).withSetter(),
    isExpanded: prop<boolean>(false).withSetter(),
}) {
    onAttachedToRootStore() {
        const expandListener = reaction(
            () => this.Children.length,
            (Children, prev) => {
                if (Children > 0 && prev === 0) {
                    this.Table.expandRow(this);
                } else if (Children === 0 && prev > 0) {
                    this.Table.collapseRow(this);
                }
            },
            { equals: comparer.shallow }
        );

        return () => {
            expandListener();
        };
    }

    @modelAction
    removeChild(child: string) {
        this.children.splice(_.indexOf(this.children, child), 1);
    }

    @modelAction
    appendChild(child: string, sequence: number) {
        this.children.splice(sequence, 0, child);
        //  this.Table.api?.current.setRowChildrenExpansion(this.id, true)
    }

    @modelAction
    moveChildren(newChildren: string[]) {
        this.setChildren(newChildren);
    }

    @modelAction
    updateColor(color: string) {
        this.setColor(color);
        this.Store.persistColor(this);
    }

    @modelAction
    handleNameChange = (name: string) => {
        this.setName(name);
        this.Store.persistActivityName(this);
    };

    @computed
    get Store() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @computed
    get Table() {
        return getRoot<Gantt>(this).Table;
    }

    @computed
    get TeamStore() {
        return getRoot<Gantt>(this).TeamStore;
    }

    @computed
    get Children() {
        return this.Store.Activities.filter((d) =>
            this.children.includes(d.id)
        ) as Activity[];
    }

    @computed
    get ChildRows(): (Activity | Assignment)[] {
        return this.Table.Rows.filter((d: Activity | Assignment) =>
            this.children.includes(d.id)
        );
    }

    @modelAction
    addChild(id: string, sequence: number) {
        this.children.splice(sequence, 0, id);
        if (this.ChildRows.length > 0) {
            this.Table.expandRow(this);
        }
        // this.Table.api?.current.setRowChildrenExpansion(this.id, true)
    }

    @computed
    get Team(): TeamMember[] {
        return _.sortBy(
            _.uniq(this.Assignments.map((d) => d.TeamMember as TeamMember)),
            (d) => d.resource.name
        );
    }

    @computed
    get Parent() {
        return this.Store?.Activities.find((d) =>
            d?.children.includes(this.id)
        );
    }

    @computed
    get path() {
        if (this.kind === "Delivery") {
            return [this.id];
        } else if (this.kind === "Task" && this.Parent) {
            return [this.Parent.id, this.id];
        }
        return [this.id];
    }

    @computed
    get sequence() {
        return this.Parent?.children.indexOf(this.id) ?? 0;
    }

    @computed
    get wbs(): string | number {
        if (this.kind === "Delivery") {
            return this.sequence + 1;
        } else if (this.Parent) {
            return this.Parent?.wbs + "." + (this.sequence + 1);
        }
        return "";
    }

    @computed
    get fill() {
        if (this.kind === "Delivery") return this.color as string;
        else if (this.kind === "Task" && this.Parent)
            return this.Parent.color as string;
        return "#000";
    }

    @computed
    get Assignments(): Assignment[] {
        if (this.kind === "Task") {
            return getRoot<Gantt>(this)?.AllotmentStore?.Assignments.filter(
                (d) => d.task === this.id
            );
        }
        return _.map(this?.Children, (d) => d?.Assignments).flat();
    }

    @modelAction
    update(json: DeliveryJson | TaskJson | PlanJson) {
        if (json.kind !== "Plan") {
            this.setName(json.name);

            this.setDescription(json.description);
        }
        if (json.kind === "Delivery") {
            this.setColor(json.color);
        }
        this.Interval.update(json.startDate, json.endDate);
    }

    @modelAction
    remove() {
        detach(this.Bar);
        detach(this.Interval);
        detach(this.Aggregates);
        detach(this.Period);
        this.Store.removeActivity(this);
    }

    @modelAction
    delete() {
        this.Store.deleteActivity(this);
        //this.Assignments.forEach(Assignment => Assignment.remove())
        //this.Children.forEach(Child => Child.remove())
    }

    @computed
    get fontWeight() {
        if (this.kind === "Delivery") return 600;
        return 100;
    }

    @computed
    get textColor() {
        if (this.kind === "Delivery") return "text.primary";
        return "text.secondary";
    }

    static ref = rootRef<Activity>("activityRef", {
        onResolvedValueChange(ref, n, o) {
            if (o && !n) {
                detach(ref);
            }
        },
    });
}

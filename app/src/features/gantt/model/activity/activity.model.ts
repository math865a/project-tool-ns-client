import _ from "lodash";
import {
    IReactionDisposer,
    comparer,
    makeAutoObservable,
    reaction,
} from "mobx";
import { ActivityJson, ActivityType } from "../../types";
import { Timesheet } from "../allocation";
import { Assignment } from "../assignment";
import {
    GanttInteraction,
    GanttInterval,
    IIntervalAsJson,
    WorkAggregates,
} from "../shared";
import { ActivityStore } from "../store.activities";
import { ActivityBar } from "./activity.bar";
import { TeamMember } from "../team/team-member.model";
import { ActivityRow } from "./activity.row";
import { ActivityStyle } from "./activity.style";

export class Activity {
    Store: ActivityStore;
    id: string;
    name: string | undefined = undefined;
    description: string | undefined = undefined;
    color: string | undefined = undefined;
    children: string[];
    kind: ActivityType;
    Interaction: GanttInteraction;
    Interval: GanttInterval;
    Row: ActivityRow;
    Style: ActivityStyle;
    Bar: ActivityBar;
    Work: WorkAggregates;

    changeListener: IReactionDisposer;

    constructor(Store: ActivityStore, json: ActivityJson) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Store = Store;
        this.update(json);
        this.Interval = new GanttInterval(
            json.startDate,
            json.endDate,
            this.handleDateChange
        );
        this.Row = new ActivityRow(this);
        this.Interaction = new GanttInteraction();
        this.Style = new ActivityStyle(this);
        this.Bar = new ActivityBar(this);
        this.Work = new WorkAggregates(this);
        this.changeListener = reaction(
            () => this.asJson,
            (json) => {
                this.Store.Transport.updateActivity({
                    id: this.id,
                    ...json,
                });
            },
            { equals: comparer.structural }
        );
    }

    addChild(child: string, sequence: number) {
        this.children.splice(sequence, 0, child);
    }

    removeChild(child: string) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    set updateName(name: string) {
        this.name = name;
    }

    set updateColor(color: string) {
        this.color = color;
    }

    set updateDescription(description: string) {
        this.description = description;
    }

    get Parent() {
        return this.Store.getParent(this.id);
    }

    get Children() {
        return this.children
            .map((d) => this.Store.Activities.find(x => x.id === d))
            .filter((d) => d) as Activity[];
    }

    get Team(): TeamMember[] {
        return _.sortBy(
            _.uniq(this.Assignments.map((d) => d.TeamMember as TeamMember)),
            (d) => d.Resource.name
        );
    }

    get Assignments(): Assignment[] {
        if (this.kind === "Task") {
            return this.Store.GanttStore.AssignmentStore.Assignments.filter(
                (d) => d.taskId === this.id
            );
        }
        return _.map(this?.Children, (d) => d?.Assignments).flat();
    }

    get Timesheets(): Timesheet[] {
        return _.map(this.Assignments, (d) =>
            d.Allocations.map((d) => d.Timesheet)
        ).flat();
    }

    get asJson() {
        return {
            name: this.name ?? "",
            color: this.color,
            description: this.description,
        };
    }

    handleDateChange = (json: IIntervalAsJson) => {
        this.Store.Transport.updatePeriod(this.id, json);
    };

    update(json: ActivityJson) {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        if (json.kind === "Delivery") {
            this.color = json.color;
        }
        this.children = json.children;
        this.kind = json.kind;
 
    }

    dispose(){
        this.changeListener()
    }

    remove(){
        this.dispose()
        this.Store.removeActivity(this);
    }

    delete(){
        this.dispose()
        this.Store.deleteActivity(this);
    }
}

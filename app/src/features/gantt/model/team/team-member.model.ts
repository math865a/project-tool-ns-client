import { makeAutoObservable } from "mobx";
import { TeamStore } from "../store.team";
import { Resource } from "./team-member.resource";
import { ResourceType } from "./team-member.resourcetype";
import { TeamMemberJson } from "../../types";
import _ from "lodash";
import { INotification } from "~/src/design-system";
import { formatDecimal } from "~/util";

export class TeamMember {
    Store: TeamStore;
    id: string;
    Resource: Resource;
    ResourceType: ResourceType;
    constructor(Store: TeamStore, json: TeamMemberJson) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Store = Store;
        this.update(json);
    }

    update(props: TeamMemberJson) {
        this.id = props.id;
        this.Resource = new Resource(props.resource);
        this.ResourceType = new ResourceType(props.resourceType);
    }

    get Deliveries(){
        return this.Store.GanttStore.ActivityStore.Deliveries.filter((d) => d.Team.includes(this));
    }

    get Assignments() {
        return this.Store.GanttStore.AssignmentStore.Assignments.filter(
            (a) => a.agentId === this.id
        );
    }

    get Allocations() {
        return this.Assignments.map((a) => a.Allocations).flat();
    }

    private get workStatList() {
        return _.map(this.Allocations, (d) => d.Timesheet.stats);
    }

    get workStats() {
        return {
            timesheet: {
                default: _.sumBy(this.workStatList, (d) => d.timesheet.default),
                overtime: _.sumBy(
                    this.workStatList,
                    (d) => d.timesheet.overtime
                ),
                total: _.sumBy(this.workStatList, (d) => d.timesheet.total),
            },
            completed: _.sumBy(this.workStatList, (d) => d.completed),
            remaining: _.sumBy(this.workStatList, (d) => d.remaining),
        };
    }

    get notifications() {
        let notits: INotification[] = [];

        if (this.Assignments.length === 0) {
            notits.push({
                type: "warning",
                text: "Ingen tildelinger",
                explanation:
                    "Der er ikke tildelt allokkeringer til dette team medlem.",
            });
        } else if (
            this.workStats.timesheet.total === 0 ||
            this.workStatList.some((d) => d.timesheet.total === 0)
        ) {
            notits.push({
                type: "warning",
                text: "Allokkering uden timer",
                explanation:
                    "Dette teammedlem har en eller flere allokeringer med 0 timer.",
            });
        } else {
            notits.push({
                type: "info",
                text: formatDecimal(this.workStats.timesheet.total) + "t",
                explanation: "Totalt arbejdstid for dette team medlem.",
            });
        }
        return notits;
    }

    get weeklyWork() {
        return _.map(
            _.groupBy(
                _.map(this.Allocations, (d) => d.Timesheet.weeklyWork).flat(),
                (d) => d.weekId
            ),
            (d) => {
                return {
                    ...d[0],
                    work: _.sumBy(d, (d) => d.work),
                };
            }
        );
    }
}

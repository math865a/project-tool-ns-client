import _ from "lodash";
import { computed } from "mobx";
import {
    getRoot,
    getSnapshot,
    idProp,
    model,
    Model,
    modelAction,
    prop,
} from "mobx-keystone";
import { INotification } from "~/src/design-system";
import { Gantt } from "../../controllers/Gantt";
import { formatDecimal } from "~/util/format";
import { Activity, Resource, ResourceType } from "gantt-models";
import { TeamMemberJson } from "../../types";

@model("team-member")
export class TeamMember extends Model(
    {
        id: idProp.typedAs<string>(),
        resource: prop<Resource>(),
        resourceType: prop<ResourceType>(),
    },
    { valueType: true }
) {
    @modelAction
    update(json: TeamMemberJson) {
        this.resource.update(json.resource);
        this.resourceType.update(json.resourceType);
    }

    @computed
    get Assignments() {
        return getRoot<Gantt>(this).AllotmentStore.Assignments.filter(
            (d) => d.agent === this.id
        );
    }

    @computed
    get Tasks() {
        return this.Assignments.map((d) => d.Task).filter(
            (d) => d
        ) as Activity[];
    }

    @computed
    get Deliveries() {
        return _.uniq(this.Tasks.map((d) => d.Parent));
    }

    @computed
    get Allocations() {
        return this.Assignments.map((d) => d.Allocations).flat();
    }

    @computed
    get timesheet() {
        return {
            default: _.sumBy(this.Assignments, (d) => d.timesheet.default),
            overtime: _.sumBy(this.Assignments, (d) => d.timesheet.overtime),
        };
    }

    @computed
    get totalWork() {
        return this.timesheet.default + this.timesheet.overtime;
    }

    @computed
    get workHours() {
        return _.round(this.totalWork / 60, 2);
    }

    @computed
    get snapshot() {
        return getSnapshot<TeamMemberJson>(this);
    }

    @computed
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
            this.totalWork === 0 ||
            this.Assignments.some((d) => d.totalWork === 0)
        ) {
            notits.push({
                type: "warning",
                text: "Tildel. uden timer",
                explanation: "Dette teammedlem er tildelt opgaver med 0 timer.",
            });
        } else {
            notits.push({
                type: "info",
                text: formatDecimal(this.workHours) + "t",
                explanation: "Totalt arbejdstid for dette team medlem.",
            });
        }
        return notits;
    }

    @computed
    get weeks() {
        return _.sortBy(
            _.uniqBy(
                _.map(this.Allocations, (d) => d.weeks).flat(),
                (d) => d.weekId
            ),
            (d) => d.year,
            (d) => d.week
        );
    }

    @computed
    get weekWorks() {
        return _.map(this.Allocations, (d) => d.weeklyWork).flat();
    }

    @computed
    get weeklyWork() {
        return _.map(this.weeks, (d) => {
            const work = _.sumBy(
                _.filter(this.weekWorks, (w) => w.weekId === d.weekId),
                (d) => d.work
            );
            return {
                ...d,
                work,
            };
        });
    }
}

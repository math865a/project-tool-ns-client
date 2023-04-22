import _ from "lodash";
import { DateTime as dt, Duration as dur, Interval as int } from "luxon";
import { computed } from "mobx";
import {
    Model,
    getRoot,
    idProp,
    model,
    modelAction,
    prop
} from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { Allocation } from "./allocation";
import { AssignmentCanvas } from "./assignment.canvas";
import { formatDecimal } from "~/util";
import { AssignmentJson } from "../../types";
@model("assignment")
export class Assignment extends Model({
    id: idProp.typedAs<string>(),
    agent: prop<string>().withSetter(),
    task: prop<string>().withSetter(),
    Canvas: prop<AssignmentCanvas>(() => new AssignmentCanvas({})),
    Allocations: prop<Allocation[]>(() => []),
    kind: prop<"Assignment">("Assignment"),
}) {
    @modelAction
    addAllocation(Allocation: Allocation) {
        this.Allocations.push(Allocation);
    }

    @modelAction
    removeAllocation(Allocation: Allocation) {
        this.Allocations.splice(_.indexOf(this.Allocations, Allocation), 1);
    }

    @modelAction
    onDragEnd = () => {
        this.Allocations.forEach((Allocation) => Allocation.Bar.save());
    };

    @computed
    get path() {
        if (!this.Task || !this.Task.Parent) return [this.task, this.id];
        return [this.Task.Parent.id, this.Task.id, this.id];
    }

    @computed
    get Store() {
        return getRoot<Gantt>(this).AllotmentStore;
    }

    @computed
    get ActivityStore() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @computed
    get TeamStore() {
        return getRoot<Gantt>(this).TeamStore;
    }

    @computed
    get TeamMember() {
        return this.TeamStore.TeamMembers.find((d) => d.id === this.agent);
    }

    @computed
    get Task() {
        return this.ActivityStore.Activities.find((d) => d.id === this.task);
    }

    @computed
    get timesheet() {
        return {
            default: _.sumBy(
                this.Allocations,
                (d) => d.timesheet.defaultMinutes
            ),
            overtime: _.sumBy(
                this.Allocations,
                (d) => d.timesheet.overtimeMinutes
            ),
        };
    }

    @computed
    get totalWork() {
        return this.timesheet.default + this.timesheet.overtime;
    }

    @computed
    get workDayCount() {
        return int
            .merge(_.map(this.Allocations, (d) => d.intervalState))
            .map((interval) =>
                interval
                    .splitBy({ days: 1 })
                    .filter((d) => ![6, 7].includes((d.start as dt).weekday))
            )
            .flat().length;
    }

    @computed
    get dailyWork() {
        if (this.workDayCount === 0) return "-";
        return (
            formatDecimal(
                _.round(
                    (this.timesheet.default + this.timesheet.overtime) /
                        60 /
                        this.workDayCount,
                    2
                )
            ) + " t/dag"
        );
    }

    @computed
    get workHoursLeft(){
        return _.sumBy(this.Allocations, d => d.workHoursLeft)
    }

    @computed
    get workHours() {
        return {
            default:
                this.timesheet.default === 0
                    ? "-"
                    : dur
                          .fromObject(
                              { minutes: this.timesheet.default },
                              { locale: "da" }
                          )
                          .shiftTo("hours", "minutes")
                          .toHuman({
                              listStyle: "short",
                              unitDisplay: "narrow",
                          })
                          .replace("og", "/"),
            overtime:
                this.timesheet.overtime === 0
                    ? "-"
                    : dur
                          .fromObject(
                              { minutes: this.timesheet.overtime },
                              { locale: "da" }
                          )
                          .shiftTo("hours", "minutes")
                          .toHuman({
                              listStyle: "short",
                              unitDisplay: "narrow",
                          })
                          .replace("og", "/"),
            total:
                this.timesheet.overtime + this.timesheet.default === 0
                    ? "-"
                    : dur
                          .fromObject(
                              {
                                  minutes:
                                      this.timesheet.overtime +
                                      this.timesheet.default,
                              },
                              { locale: "da" }
                          )
                          .shiftTo("hours", "minutes")
                          .toHuman({
                              listStyle: "short",
                              unitDisplay: "narrow",
                          })
                          .replace("og", "/"),
        };
    }

    @computed
    get cost() {
        if (!this.TeamMember) return 0;
        return _.round(
            (this.timesheet.default / 60) *
                this.TeamMember.resource.costRate.default +
                (this.timesheet.overtime / 60) *
                    this.TeamMember.resource.costRate.overtime,
            2
        );
    }

    @computed
    get sales() {
        if (!this.TeamMember) return 0;
        return _.round(
            (this.timesheet.default / 60) *
                this.TeamMember.resourceType.salesRate.default +
                (this.timesheet.overtime / 60) *
                    this.TeamMember.resourceType.salesRate.overtime
        );
    }

    @computed
    get profit() {
        return this.sales - this.cost;
    }

    @computed
    get coverage() {
        if (this.sales === 0) return 0;
        return _.round(this.profit / this.sales, 2);
    }

    @computed
    get finance() {
        return {
            cost: this.cost,
            sales: this.sales,
            profit: this.profit,
            coverage: this.coverage,
        };
    }

    @computed
    get period() {
        const startDate = dt.min(
            ..._.map(this.Allocations, (d) => d.dtState.start)
        );
        const endDate = dt.max(
            ..._.map(this.Allocations, (d) => d.dtState.end)
        );
        if (startDate && endDate) {
            return (
                startDate.toFormat("d/M/yy") +
                " - " +
                endDate.toFormat("d/M/yy")
            );
        }
        return "-";
    }

    @computed
    get Assignments() {
        return [this];
    }

    @computed
    get hasAllocationDragEvent() {
        return _.some(this.Allocations, (d) => d.Bar.event !== null);
    }


    @modelAction
    update(json: AssignmentJson) {}

    @modelAction
    delete() {
        this.Store.deleteAssignment(this);
    }

    @modelAction
    remove() {
        this.Store.removeAssignment(this);
    }
}

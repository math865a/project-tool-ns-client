import _ from "lodash";
import { Timesheet } from "../allocation";
import { GanttInterval } from "./interval";

abstract class Parent {
    Timesheets: Timesheet[];
    Interval: GanttInterval;
}

export class WorkAggregates {
    constructor(private Parent: Parent) {}

    private get workBreakdown() {
        return {
            default: _.sumBy(
                this.Parent.Timesheets,
                (d) => d.stats.timesheet.default
            ),
            overtime: _.sumBy(
                this.Parent.Timesheets,
                (d) => d.stats.timesheet.overtime
            ),
            total: _.sumBy(
                this.Parent.Timesheets,
                (d) => d.stats.timesheet.total
            ),
        };
    }

    private get workHoursCompleted() {
        return _.sumBy(
            this.Parent.Timesheets,
            (d) => d.stats.completed
        );
    }

    private get workHoursRemaining() {
        return _.sumBy(
            this.Parent.Timesheets,
            (d) => d.stats.remaining
        );
    }

    private get workHoursCompletedRatio() {
        return this.workHoursCompleted / this.workBreakdown.total;
    }

    private get workHoursRemainingRatio() {
        return this.workHoursRemaining / this.workBreakdown.total;
    }

    get raw() {
        return {
            default: this.workBreakdown.default,
            overtime: this.workBreakdown.overtime,
            total: this.workBreakdown.total,
            completed: this.workHoursCompleted,
            remaining: this.workHoursRemaining,
            completedRatio: this.workHoursCompletedRatio,
            remainingRatio: this.workHoursRemainingRatio,
            dailyWork: this.workBreakdown.total / this.Parent.Interval.counts.workDays,
        };
    }

    get work() {
        return _.mapValues(this.raw, (d) => _.round(d, 2));
    }

    get display() {
        return _.mapValues(this.work, (v, k) => {
            if (k === "completedRatio" || k === "remainingRatio")
                return `${v * 100}%`;
            return v + "t";
        });
    }
}

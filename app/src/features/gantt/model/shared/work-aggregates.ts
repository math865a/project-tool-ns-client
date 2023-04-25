import _ from "lodash";
import { Timesheet } from "../allocation";
import { GanttInterval } from "./interval";
import { makeAutoObservable } from "mobx";
import { formatDecimal } from "~/util";

abstract class Parent {
    Timesheets: Timesheet[];
    Interval: GanttInterval;
}

export class WorkAggregates {
    constructor(private Parent: Parent) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

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
        return _.sumBy(this.Parent.Timesheets, (d) => d.stats.completed);
    }

    private get workHoursRemaining() {
        return _.sumBy(this.Parent.Timesheets, (d) => d.stats.remaining);
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
            dailyWork:
                this.workBreakdown.total / this.Parent.Interval.counts.workDays,
        };
    }

    get dayWork() {
        return _.sortBy(
            _.map(
                _.groupBy(
                    _.map(this.Parent.Timesheets, (d) => d.dayWork).flat(),
                    (d) => d.iso
                ),
                (d) => {
                    return {
                        dt: d[0].dt,
                        iso: d[0].iso,
                        date: d[0].dt.toJSDate(),
                        work: _.sumBy(d, (d) => d.work),
                    };
                }
            ),
            (d) => d.dt
        );
    }

    get work() {
        return _.mapValues(this.raw, (d) => _.round(d, 1));
    }

    get display() {
        return _.mapValues(this.work, (v, k) => {
            if (k === "completedRatio" || k === "remainingRatio")
                return `${Math.round(v * 100)}%`;
            return formatDecimal(v);
        });
    }
}

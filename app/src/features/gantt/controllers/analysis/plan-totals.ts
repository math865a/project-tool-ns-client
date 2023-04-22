import { computed } from "mobx";
import { getRoot, Model, model } from "mobx-keystone";
import { Gantt } from "../Gantt";
import { Interval as int, DateTime as dt, Duration as dur } from "luxon";
import {
    getNormalizedNow,
    getNormalizedNowPlus,
    getWorkDays,
} from "~/util/time";
import _ from "lodash";
import { formatDecimal } from "~/util/format";

@model("plan-totals")
export class PlanTotals extends Model({}) {
    @computed
    get Plan() {
        return getRoot<Gantt>(this).ActivityStore.Plan;
    }

    formatDate(date: dt) {
        return _.capitalize(date.toFormat("cccc d. MMMM yyyy"));
    }

    @computed
    get interval() {
        if (this.Plan) {
            return this.Plan.Interval.interval;
        }
        return int.fromDateTimes(
            getNormalizedNow(),
            getNormalizedNowPlus({ months: 1 })
        );
    }

    @computed
    get start() {
        return this.formatDate(this.interval.start as dt);
    }

    @computed
    get end() {
        return this.formatDate(this.interval.end as dt);
    }

    @computed
    get days() {
        return this.interval.splitBy({ days: 1 }).length;
    }

    @computed
    get isFinished() {
        return (this.interval.end as dt) < dt.now();
    }

    @computed
    get workdays() {
        return getWorkDays(this.interval);
    }

    @computed
    get workdaysPassed() {
        if (this.isFinished) return this.workdays;
        const now = dt.now();
        if (now > (this.interval.start as dt)) {
            const interval = int.fromDateTimes(this.interval.start as dt, now);
            return getWorkDays(interval);
        }
        return 0;
    }

    @computed
    get workdaysLeft() {
        if (this.isFinished) return 0;
        return this.workdays - this.workdaysPassed;
    }

    @computed
    get workHours() {
        return this.Plan?.Aggregates.workHours.total;
    }

    @computed
    get dailyWork() {
        return dur
            .fromObject({
                hours: (this.Plan?.Aggregates.totalHours ?? 0) / this.workdays,
            })
            .shiftTo("hours", "minutes")
            .toFormat("hh:mm");
    }
}

import { computed } from "mobx";
import { getRoot, Model, model } from "mobx-keystone";
import { Gantt } from "../Gantt";
import { Interval as int, DateTime as dt } from "luxon";
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
    get start(){
        return this.formatDate(this.interval.start as dt);
    }

    @computed
    get end(){
        return this.formatDate(this.interval.end as dt);
    }

    @computed
    get days(){
        return this.interval.splitBy({ days: 1 }).length;
    }

    @computed
    get workdays(){
        return getWorkDays(this.interval);
    }


    @computed
    get workHours(){
        return this.Plan?.Aggregates.displayWork
    }

    @computed
    get dailyWork(){
        const workHours = this.Plan?.Aggregates.totalHours === "-" ? 0 : this.Plan?.Aggregates.totalHours ?? 0
        if (this.workdays !== 0){
            return formatDecimal(_.round(workHours / this.workdays,2)) + "t/dag";
        }
        return "0t";

    }


}

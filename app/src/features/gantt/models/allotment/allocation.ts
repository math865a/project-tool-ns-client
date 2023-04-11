import { color } from "d3-color";
import _ from "lodash";
import { DateTime as dt, Duration as dur, Interval as int } from "luxon";
import { computed } from "mobx";
import {
    getRoot,
    idProp,
    Model,
    model,
    modelAction,
    prop
} from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { Interval } from "../_shared/interval";
import { AllocationBar } from "./allocation.bar";
import { getContrastColor } from "~/util";

@model("allocation")
export class Allocation extends Model({
    id: idProp.typedAs<string>(),
    Interval: prop<Interval>(),
    timesheet: prop<{
        defaultMinutes: number;
        overtimeMinutes: number;
    }>().withSetter(),
    assignment: prop<string>(),
    Bar: prop<AllocationBar>(() => new AllocationBar({})),
}) {
    @computed
    get AllotmentStore() {
        try {
            return getRoot<Gantt>(this)?.AllotmentStore;
        } catch(e){
      
        }

    }
    @computed
    get Assignment() {
        return this.AllotmentStore?.Assignments?.find(
            (d) => d.id === this.assignment
        );
    }

    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    @modelAction
    updateTimesheet(defaultWork: number, overtimeWork: number) {
        this.setTimesheet({
            defaultMinutes: _.round(defaultWork * 60),
            overtimeMinutes: _.round(overtimeWork * 60),
        });
    }

    @modelAction
    delete() {
        this.Assignment?.removeAllocation(this);
    }

    @computed
    get totalMinutes() {
        return this.timesheet.defaultMinutes + this.timesheet.overtimeMinutes;
    }

    @computed
    get timesheetHours() {
        return {
            default: dur
                .fromObject({ minutes: this.timesheet.defaultMinutes })
                .shiftTo("hours").hours,
            overtime: dur
                .fromObject({ minutes: this.timesheet.overtimeMinutes })
                .shiftTo("hours").hours,
        };
    }

    @computed
    get totalHours() {
        return dur.fromObject({ minutes: this.totalMinutes }).shiftTo("hours")
            .hours;
    }

    @computed
    get dailyWork() {
        if (this.Interval.workdayCount === 0) return 0;
        return _.round(this.totalHours / this.Interval.workdayCount, 2);
    }

    @computed
    get fill() {
        const col = this.Assignment?.TeamMember?.resource.color;
        if (col) {
            const darker = color(col)?.darker(0.65).formatHex();
            const brighter = color(col)?.brighter(2).formatHex();
            const contrast = getContrastColor(col);
            return {
                color: contrast,
                darker: darker,
                brighter: brighter,
                background: col,
                border: contrast === "#000000" ? brighter : darker,
            };
        }
        return {
            color: "",
            darker: "",
            brighter: "",
            border: "",
        };
    }

    @computed
    get periodState() {
        return {
            start: this.Timeline.xScale.invert(this.Bar.coord.x),
            end: this.Timeline.xScale.invert(
                this.Bar.coord.x + this.Bar.coord.w
            ),
        };
    }

    @computed
    get dtState() {
        return {
            start: dt.fromMillis(this.periodState.start),
            end: dt.fromMillis(this.periodState.end),
        };
    }

    @computed
    get intervalState() {
        return int.fromDateTimes(this.dtState.start, this.dtState.end);
    }

    @computed
    get displayPeriodState() {
        return {
            start: this.dtState.start.toFormat("dd/MM/yyyy"),
            end: this.dtState.end.toFormat("dd/MM/yyyy"),
        };
    }

    @computed
    get workdays() {
        return this.Interval.interval
            .splitBy({ days: 1 })
            .filter((d) => ![6, 7].includes((d.start as dt).weekday))
            .map((d) => ({
                datetime: d.start,
                week: (d.start as dt).weekNumber,
                year: (d.start as dt).year,
                work: this.dailyWork,
                weekId: String((d.start as dt).weekNumber) + String((d.start as dt).year),
            }));
    }

    @computed
    get weeks() {
        return _.uniqBy(
            this.Interval.interval
                .splitBy({ weeks: 1 })
                .map((d) => ({
                    week: (d.start as dt).weekNumber,
                    year: (d.start as dt).year,
                    weekId: String((d.start as dt).weekNumber) + String((d.start as dt).year),
                })),
            (d) => d.weekId
        );
    }

    @computed
    get weeklyWork() {
        return _.map(this.weeks, (d) => {
            const workDays = _.filter(
                this.workdays,
                (x) => x.weekId === d.weekId
            );
            return {
                week: d.week,
                year: d.year,
                weekId: d.weekId,
                work: _.sumBy(workDays, (x) => x.work),
            };
        });
    }
}

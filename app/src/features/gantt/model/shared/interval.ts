import _ from "lodash";
import { DateTime as dt, Interval as int } from "luxon";
import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { getDateTime, getWorkDays } from "~/util";

type ChangeHandler = (data: {
    start: string;
    end: string;
    workDayCount: number;
}) => void;

export interface IIntervalAsJson {
    start: string;
    end: string;
    workDayCount: number;
}

export class GanttInterval {
    changeListener: IReactionDisposer | null = null;
    constructor(
        public start: string,
        public end: string,
        public onChange?: ChangeHandler
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.init();
    }

    set updateStart(start: string) {
        this.start = start;
    }

    set updateEnd(end: string) {
        this.end = end;
    }

    update(start: string | number | dt, end: string | number | dt) {
        this.start = getDateTime(start).toISODate() as string;
        this.end = getDateTime(end).toISODate() as string;
    }

    increment(start: number, end: number) {
        this.update(
            this.dt.start.plus({ milliseconds: start }),
            this.dt.end.plus({ milliseconds: end })
        );
    }

    init() {
        if (this.onChange) {
            this.changeListener = reaction(
                () => this.asJson,
                (json) => {
                    if (this.onChange) {
                        this.onChange(json);
                    } else {
                        throw new Error("No onChange handler");
                    }
                }
            );
        }
    }

    get dt() {
        return {
            start: dt.fromISO(this.start, { zone: "utc", locale: "da" }),
            end: dt.fromISO(this.end, { zone: "utc", locale: "da" }),
        };
    }

    get t() {
        return {
            s: this.dt.start.toMillis(),
            f: this.dt.end.toMillis(),
        };
    }


    get isFinished(){
        return this.dt.end < dt.now()
    }

    get interval() {
        const interval = int.fromDateTimes(this.dt.start, this.dt.end);
        if (interval.isValid) {
            return interval;
        }
        throw new Error("Invalid interval");
    }

    get intervals() {
        const days = this.interval
            .splitBy({ days: 1 })
            .map((d) => d.start as dt);
        const weekendDays = days.filter((d) => [6, 7].includes(d.day));
        const workDays = days.filter((d) => ![6, 7].includes(d.day));
        const weeks = _.uniqBy(
            _.map(workDays, (d) => ({
                week: d.weekNumber,
                year: d.year,
                weekId: d.weekNumber + "/" + d.year,
            })),
            (d) => d.weekId
        );
        const months = _.uniqBy(
            _.map(workDays, (d) => ({
                month: d.month,
                year: d.year,
                monthId: d.month + "/" + d.year,
            })),
            (d) => d.monthId
        );

        return { days, weekendDays, workDays, weeks, months };
    }

    get counts() {
        const weekendCount = this.intervals.weekendDays.length;
        const dayCount = this.intervals.days.length;
        const isFinished = this.dt.end < dt.now();
        const workDayCount = dayCount - weekendCount;
        const workdaysPassed = this.getWorkDaysPassed(isFinished, workDayCount);
        const workdaysLeft = workDayCount - workdaysPassed;
        const workdaysSince = Math.round(
            dt.now().diff(this.dt.end).shiftTo("days").days
        );
        return {
            days: dayCount,
            offDays: weekendCount,
            workDays: workDayCount,
            workDaysComplete: workdaysPassed,
            workDaysRemaining: workdaysLeft,
            workDaysSince: workdaysSince,
        };
    }

    getWorkDaysPassed(isFinished: boolean, workDayCount: number) {
        if (isFinished) return workDayCount;
        const now = dt.now();
        if (now > (this.interval.start as dt)) {
            const interval = int.fromDateTimes(this.interval.start as dt, now);
            return getWorkDays(interval);
        }
        return 0;
    }

    get ratios() {
        const { workDays, workDaysComplete, workDaysRemaining } = this.counts;
        const result = {
            workDays: workDaysComplete / workDays,
            workDaysLeft: workDaysRemaining / workDays,
            workDaysComplete: workDaysComplete / workDays,
        };
        return _.mapValues(result, (v) => _.round(v, 2));
    }

    get display() {
        const dates = {
            short: {
                start: this.dt.start.toLocaleString(dt.DATE_SHORT),
                end: this.dt.end.toLocaleString(dt.DATE_SHORT),
            },
            long: {
                start: this.dt.start.toLocaleString(dt.DATE_FULL),
                end: this.dt.end.toLocaleString(dt.DATE_FULL),
            },
        };
        const intervals = {
            short: dates.short.start + " til " + dates.short.end,
            long: dates.long.start + " til " + dates.long.end,
        };

        return {
            dates,
            intervals,
            counts: {
                short: _.mapValues(this.counts, (d) => d + "d"),
                medium: _.mapValues(this.counts, (d) => d + " dage"),
                long: _.mapValues(this.counts, (d, i) => {
                    let suffix = " arbejdsdage";
                    if (i === "days") {
                        suffix = " dage";
                    } else if (i === "offDays") {
                        suffix = " fridage";
                    }
                    return d + suffix;
                }),
            },
            percentages: _.mapValues(this.ratios, (v) => String(v * 100) + "%"),
        };
    }

    get asJson() {
        return {
            start: this.start,
            end: this.end,
            workDayCount: this.counts.workDays,
        };
    }
}

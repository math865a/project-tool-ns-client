import _ from "lodash";
import { GanttInterval } from "../shared";
import { makeAutoObservable } from "mobx";

export class Timesheet {
    private Interval: GanttInterval;
    defaultMinutes: number = 0;
    overtimeMinutes: number = 0;
    constructor(
        Interval: GanttInterval,
        timesheet?: {
            defaultMinutes: number;
            overtimeMinutes: number;
        }
    ) {
        makeAutoObservable(this, {}, { autoBind: true })
        this.Interval = Interval;
        if (timesheet) {
            this.defaultMinutes = timesheet.defaultMinutes;
            this.overtimeMinutes = timesheet.overtimeMinutes;
        }
    }

    updateTimesheet(defaultWork: number, overtimeWork: number) {
        this.defaultMinutes = _.round(defaultWork * 60);
        this.overtimeMinutes = _.round(overtimeWork * 60);
    }

    private get timesheetHours() {
        const defaultHours = this.defaultMinutes / 60;
        const overtimeHours = this.overtimeMinutes / 60;
        return {
            default: defaultHours,
            overtime: overtimeHours,
            total: defaultHours + overtimeHours,
        };
    }

    private get dailyWork() {
        return (
            this.timesheetHours.total /
            this.Interval.counts.workDays
        );
    }

    get weeklyWork() {
        return _.map(this.Interval.intervals.weeks, (d) => {
            const workdayCount = _.filter(
                this.Interval.intervals.workDays,
                (x) => x.weekNumber + "/" + x.year === d.weekId
            ).length;
            return {
                ...d,
                work: workdayCount * this.dailyWork,
            };
        });
    }

    private get workHoursCompleted() {
        const { workDaysComplete } = this.Interval.counts;
        return workDaysComplete * this.dailyWork;
    }

    private get workHoursRemaining() {
        const { workDaysRemaining } = this.Interval.counts;
        return workDaysRemaining * this.dailyWork;
    }

    get stats() {
        return {
            timesheet: this.timesheetHours,
            dailyWork: this.dailyWork,
            weeklyWork: this.weeklyWork,
            completed: this.workHoursCompleted,
            remaining: this.workHoursRemaining,
        };
    }
}

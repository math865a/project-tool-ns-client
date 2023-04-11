import { DateObjectUnits } from "luxon";

export class AllocationJson {
    id: string;
    interval: {
        start: DateObjectUnits;
        end: DateObjectUnits;
    };
    timesheet: {
        defaultMinutes: number;
        overtimeMinutes: number;
    };

    constructor(props: {
        id: string;
        interval: {
            start: DateObjectUnits;
            end: DateObjectUnits;
        };
        timesheet: {
            defaultMinutes: number;
            overtimeMinutes: number;
        };
    }) {
        this.id = props.id;
        this.interval = props.interval;
        this.timesheet = props.timesheet;
    }
}

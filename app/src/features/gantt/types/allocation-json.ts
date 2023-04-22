

export class AllocationJson {
    id: string;
    interval: {
        start: string;
        end: string;
    };
    timesheet: {
        defaultMinutes: number;
        overtimeMinutes: number;
    };

    constructor(props: {
        id: string;
        interval: {
            start: string;
            end: string;
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

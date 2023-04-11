import {Interval as int} from "luxon"
export interface IRawAllocation {
    id: string;
    work: number;
    start: string;
    end: string;
    display: IRawAllocationDisplay;
}

export interface IRawAllocationDisplay {
    period: {
        start: string;
        end: string;
    };
    work: string;
}

export interface IAllocationDisplay extends IRawAllocationDisplay {
    dailyWork: string;
    workDays: string;
}

export interface IAllocation extends Omit<IRawAllocation, "display"> {
    workDays: number;
    dailyWork: number;
    display: IAllocationDisplay;
    interval: int;
}

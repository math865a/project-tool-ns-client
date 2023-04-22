import { Interval as int } from 'luxon';
export interface IHeaderInterval {
    t: number;
    primary: string;
    bold?: boolean
    secondary?: string;
    interval: int;
}

export interface ISubInterval {
    interval: int;
    t: number;
    label: string;
    describes: string;
}

export interface IInterval {
    headerIntervals: IHeaderInterval[];
    subIntervals: ISubInterval[];
}

export interface ITimelineHelpers extends IInterval {
    ticks: number[];
    subTicks: number[];
    closures: ISubInterval[];
}

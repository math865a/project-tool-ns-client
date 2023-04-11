import { Interval as int, DateTime as dt } from "luxon";
import v from "voca";
import { IHeaderInterval, ISubInterval } from "./_types";

function getText(boundary: int) {
    const date = boundary.start as dt;
    if (date.quarter === 1) {
        return {
            primary: "Q" + date.toFormat("q yyyy"),
            secondary: "",
            bold: true,
        };
    }
    return {
        primary: `Q${(boundary.start as dt).toFormat("q")}`,
        secondary: undefined,
    };
}

function getHeaderIntervals(interval: int): IHeaderInterval[] {
    const interval1 = int.fromDateTimes(
        (interval.start as dt).set({ day: 1, month: 1 }),
        (interval.end as dt).set({ day: 1, month: 1 })
    );
    return interval1.splitBy({ quarters: 1 }).map((d) => ({
        interval: d,
        ...getText(d),
        t: (d.start as dt).toMillis(),
    }));
}

function getSubIntervals(intervals: IHeaderInterval[]): ISubInterval[] {
    return intervals
        .map((header) =>
            header.interval.splitBy({ months: 1 }).map((d) => ({
                interval: d,
                t: (d.start as dt).toMillis(),
                label: v.capitalize((d.start as dt).toFormat("MMMMM")),
                describes: "Capacity",
            }))
        )
        .flat();
}

export const Quarter = {
    getText: getText,
    getHeaderIntervals: getHeaderIntervals,
    getSubIntervals: getSubIntervals,
};

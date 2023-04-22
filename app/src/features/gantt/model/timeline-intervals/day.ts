import _ from "lodash";
import { DateTime as dt, Interval as int } from 'luxon';
import { IHeaderInterval, ISubInterval } from './_types';
function getText(boundary: int) {
    const date = boundary.start as dt;
    if (date.day === 1){
        return {
            primary: _.capitalize(date.toFormat("MMM yy")),
            bold: true,
            secondary: ""
        }
    } else if (date.weekday === 1) {
        return {
            primary: "U" +_.capitalize(date.toFormat("W")),
            bold: true,
            secondary: ""
        }}
    return {
        primary: _.capitalize(date.toFormat("ccccc d/M")),
        secondary: ""
    }
}

function getHeaderIntervals(interval: int): IHeaderInterval[] {
    return interval.splitBy({ days: 1 }).map((d) => ({
        interval: d,
        ...getText(d),
        t: (d.start as dt).toMillis(),
    }));
}

function getSubIntervals(intervals: IHeaderInterval[]): ISubInterval[] {
    return []/* intervals
        .map((header) => {
            const start = header.interval.start.minus({
                days: header.interval.start.weekday - 1,
            });
            const end = header.interval.end.minus({
                days: header.interval.end.weekday - 1,
            });
            return int
                .fromDateTimes(start, end)
                .splitBy({ weeks: 1 })
                .map((d) => ({
                    interval: d,
                    t: d.start.toMillis(),
                    label: 'U' + d.start.toFormat('W'),
                    describes: 'Capacity',
                }));
        })
        .flat();*/
}

export const Day = {
    getText: getText,
    getHeaderIntervals: getHeaderIntervals,
    getSubIntervals: getSubIntervals,
};

import { Interval as int, DateTime as dt } from 'luxon';
import v from 'voca';
import { IHeaderInterval, ISubInterval } from './_types';

function getText(boundary: int) {
    const date = boundary.start as dt
    if (date.month % 3 === 0){
        return {
            primary: v.capitalize(date.toFormat('MMM yy')),
            secondary: ""
        };
    }
    return {
        primary: v.capitalize(date.toFormat('MMM')),
        secondary: ""
    };
}

function getHeaderIntervals(interval: int): IHeaderInterval[] {
    return interval.splitBy({ months: 1 }).map((d) => ({
        interval: d,
        ...getText(d),
        t: (d.start as dt).toMillis(),
    }));
}

function getSubIntervals(intervals: IHeaderInterval[]): ISubInterval[] {
    return intervals
        .map((header) => {
            const start = (header.interval.start as dt).minus({
                days: (header.interval.start as dt).weekday - 1,
            });
            const end = (header.interval.end as dt).minus({
                days: (header.interval.end as dt).weekday - 1,
            });
            return int
                .fromDateTimes(start, end)
                .splitBy({ weeks: 1 })
                .map((d) => ({
                    interval: d,
                    t: (d.start as dt).toMillis(),
                    label: 'U' + (d.start as dt).toFormat('W'),
                    describes: 'Capacity',
                }));
        })
        .flat();
}

export const Month = {
    getText: getText,
    getHeaderIntervals: getHeaderIntervals,
    getSubIntervals: getSubIntervals,
};

import { Duration as dur, type Interval as int , DateTime as dt} from 'luxon';
import v from 'voca';
import { getDescribes } from './general';
import { IHeaderInterval, ISubInterval } from './_types';

function getText(boundary: int) {
    const date = boundary.start as dt;
    const endDate = (boundary.end as dt).minus(dur.fromObject({ days: 1 }));
    if (date.weekNumber % 8 === 0) {
        return {
            primary: `Uge ${date.toFormat('W')}`,
            secondary: `${date.toFormat('d.')}-${endDate.toFormat('d. MM')}`,
        };
    } else if (date.month !== endDate.month) {
        return {
            primary: v.capitalize(endDate.toFormat('MMM yy')),
            secondary: `${date.toFormat('d.')}-${endDate.toFormat('d. MM')}`,
            bold: true
        };
    }
    return {
        primary: `Uge ${date.toFormat('W')}`,
        secondary: `${date.toFormat('d.')}-${endDate.toFormat('d. MMM')}`,
    };
}

function getHeaderIntervals(interval: int): IHeaderInterval[] {
    return interval.splitBy({ weeks: 1 }).map((d) => ({
        interval: d,
        ...getText(d),
        t: (d.start as dt).toMillis(),
    }));
}

function getSubIntervals(intervals: IHeaderInterval[]): ISubInterval[] {
    return intervals
        .map((header) =>
            header.interval.splitBy({ days: 1 }).map((d) => ({
                interval: d,
                t: (d.start as dt).toMillis(),
                label: v.capitalize((d.start as dt).toFormat('ccccc')),
                describes: getDescribes(d),
            }))
        )
        .flat();
}

export const Week = {
    getText: getText,
    getHeaderIntervals: getHeaderIntervals,
    getSubIntervals: getSubIntervals,
};

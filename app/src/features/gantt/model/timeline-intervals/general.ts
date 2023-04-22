import { DateTime as dt, Duration as dur, type Interval as int } from 'luxon';

import { Granularity } from "gantt/constants";
export function dNorm(t: number) {
    return dt.fromMillis(t, { zone: 'utc', locale: 'da' }).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    });
}

export function norm(t: number | dt, granularity: Granularity) {
    if (typeof t !== 'number') {
        t = t.toMillis();
    }
    const d = dNorm(t);
    switch (granularity) {
        case Granularity.q:
            return d.set({ day: 1 });
        case Granularity.m:
            return d.minus(dur.fromObject({ days: d.day - 1 }));
        case Granularity.w:
            return d.minus(dur.fromObject({ days: d.weekday - 1 }));
        default:
            return d
    }
}

export function getDescribes(i: int) {
    return [6, 7].includes((i.start as dt).weekday) ? 'Closure' : 'Capacity';
}

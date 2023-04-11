import { ViewMode } from '@math865a/project-tool.types';
import { DateTime as dt, Duration as dur, Interval as int } from 'luxon';
import { computed } from 'mobx';
import { getRoot, Model, model, prop } from 'mobx-keystone';
import { CapacityBoard } from './_board';

@model('capacity-calendar')
export class Calendar extends Model({
    dpx: prop<number>(3.75).withSetter(),
    tStart: prop<number>(() => dt.now().toMillis()).withSetter(),
    pad: prop<number>(0.5).withSetter(),
}) {
    @computed
    get Dimensions() {
        return getRoot<CapacityBoard>(this).Dimensions;
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get tDays() {
        return this.Dimensions.chartWidth / this.dpx;
    }

    @computed
    get t() {
        return dur.fromObject({ days: this.tDays }).toMillis();
    }

    @computed
    get tEnd() {
        return this.tStart + this.t;
    }

    @computed
    get visibleInterval() {
        return int.fromDateTimes(
            dt.fromMillis(this.tStart),
            dt.fromMillis(this.tEnd)
        );
    }

    @computed
    get dtPad() {
        return this.t * this.pad;
    }

    @computed
    get tStartPad() {
        return this.tStart - this.dtPad;
    }

    @computed
    get tEndPad() {
        return this.tEnd + this.dtPad;
    }

    @computed
    get tPad() {
        return this.tEndPad - this.tStartPad;
    }

    @computed
    get dStart() {
        return this.norm(this.tStartPad);
    }

    @computed
    get dEnd() {
        return this.norm(this.tEndPad);
    }

    @computed
    get padPeriod() {
        return int.fromDateTimes(
            dt.fromMillis(this.dStart),
            dt.fromMillis(this.dEnd)
        );
    }

    @computed
    get dt() {
        switch (this.View.viewMode) {
            case ViewMode.Day:
                return dur.fromObject({ days: 1 });
            case ViewMode.Week:
                return dur.fromObject({ weeks: 1 });
            default:
                return dur.fromObject({ months: 1 });
        }
    }

    @computed
    get rawIntervals() {
        return this.padPeriod.splitBy(this.dt);
    }

    @computed
    get intervals() {
        return this.rawIntervals.map((d) => ({
            start: (d.start as dt).toMillis(),
            end: (d.end as dt).minus({ days: 1 }).toMillis(),
        }));
    }

    //Util
    norm(t: number) {
        const date = this.normalizeDate(dt.fromMillis(t));
        switch (this.View.viewMode) {
            case ViewMode.Day:
                return this.normalizeDate(date).toMillis();
            case ViewMode.Week:
                return this.normalizeDate(
                    date.minus(dur.fromObject({ days: date.weekday - 1 }))
                ).toMillis();
            default:
                return this.normalizeDate(
                    date.minus(dur.fromObject({ days: date.day - 1 }))
                ).toMillis();
        }
    }
    normalizeDate(date: dt) {
        const normalizedDate = dt.fromObject({
            day: date.day,
            month: date.month,
            year: date.year,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        });
        return normalizedDate;
    }
}

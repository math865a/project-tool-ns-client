import _ from "lodash";
import { DateTime as dt, Interval as int } from "luxon";
import { computed } from "mobx";
import { getRoot, Model, model } from "mobx-keystone";
import { Gantt } from "./Gantt";
import * as F from "./helperFunctions";
import { type IInterval } from "./helperFunctions/_types";
import { Granularity, GRANULARITY_THRESHOLDS } from "gantt/constants";

@model("timeline-intervals")
export default class TimelineIntervals extends Model({}) {
    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    @computed
    get Table() {
        return getRoot<Gantt>(this).Table;
    }
    @computed
    get Dimensions() {
        return getRoot<Gantt>(this).Dimensions;
    }

    @computed
    get granularity() {
        return this.getGranularity(this.Timeline.dpx);
    }

    @computed
    get paddedSpan() {
        return int.fromDateTimes(
            (this.Timeline.boundaryInterval.start as dt).minus({
                milliseconds: this.Timeline.dt/3,
            }),
            (this.Timeline.boundaryInterval.end as dt).plus({ milliseconds: this.Timeline.dt/3 })
        );
    }

    @computed
    get intervals(): IInterval {
        return this.getIntervals(
            this.Timeline.boundaryInterval,
            this.Dimensions.timelineWidth
        );
    }

    getGranularity(dpx: number) {
        if (dpx >= GRANULARITY_THRESHOLDS[Granularity.d]) {
            return Granularity.d;
        } else if (dpx >= GRANULARITY_THRESHOLDS[Granularity.w]) {
            return Granularity.w;
        } else if (dpx >= GRANULARITY_THRESHOLDS[Granularity.m]) {
            return Granularity.m;
        }
        return Granularity.q;
    }

    @computed
    get closures() {
        if (this.Timeline.dpx > 5) {
            return int
                .merge(
                    this.paddedSpan
                        .mapEndpoints((d) => F.norm(d, this.granularity))
                        .splitBy({ days: 1 })
                        .filter((d) => [6, 7].includes((d.start as dt).weekday))
                )
                .map((interval) => {
                    const x1 = this.Timeline.xScale((interval.start as dt).toMillis());
                    const x2 = this.Timeline.xScale((interval.end as dt).toMillis());
                    const w = x2 - x1;
                    return {
                        x: x1,
                        w,
                        key: interval.toString(),
                    };
                });
        }
        return [];
    }

    getIntervals(interval: int, width: number) {
        const days = interval.toDuration("days").days;
        const dpx = width / days;
        const granularity = this.getGranularity(dpx);

        interval = int
            .fromDateTimes(
                (interval.start as dt).minus({ days: days / 2 }),
                (interval.end as dt).plus({ days: days / 2 })
            )
            .mapEndpoints((d) => F.norm(d, granularity));
        interval = interval;
        switch (granularity) {
            case Granularity.q:
                const quarterHeader = F.Quarter.getHeaderIntervals(interval);
                const quarterSub = F.Quarter.getSubIntervals(quarterHeader);
                return {
                    headerIntervals: quarterHeader,
                    subIntervals: quarterSub,
                };
            case Granularity.m:
                const monthHeader = F.Month.getHeaderIntervals(interval);
                const monthSub = F.Month.getSubIntervals(monthHeader);
                return {
                    headerIntervals: monthHeader,
                    subIntervals: monthSub,
                };

            case Granularity.w:
                const weekHeader = F.Week.getHeaderIntervals(interval);
                const weekSub = F.Week.getSubIntervals(weekHeader);
                return {
                    headerIntervals: weekHeader,
                    subIntervals: weekSub,
                };
            default:
                const dayHeader = F.Day.getHeaderIntervals(interval);
                return {
                    headerIntervals: dayHeader,
                    subIntervals: [],
                };
        }
    }

    @computed
    get ticks() {
        return this.intervals.headerIntervals.map((d) => d.t);
    }

    @computed
    get subTicks() {
        return _.map(this.intervals.subIntervals, (d) => d.t);
    }
}

import { computed } from "mobx";
import { getRoot, Model, model, prop } from "mobx-keystone";
import { Gantt } from "../Gantt";
import { DateTime as dt, Duration as dur, Interval as int } from "luxon";
import { getNormalizedNow, getNormalizedNowPlus } from "~/util/time";
import { scaleBand, scaleLinear } from "@visx/scale";
import _ from "lodash";

@model("planning-chart-model")
export class PlanningChartModel extends Model({
    rowHeight: prop<number>(40),
    top: prop<number>(20),
    hBar: prop<number>(25),
    tPad: prop<number>(0.25),
    width: prop<number>(0).withSetter(),
    maxHeight: prop<number>(200),
    footerHeight: prop<number>(100).withSetter()
}) {
    spacing = this.rowHeight - this.hBar;

    @computed
    get Gantt() {
        return getRoot<Gantt>(this);
    }

    @computed
    get data() {
        return _.sortBy(this.Gantt.ActivityStore.Deliveries, d => d.Interval.startDate.toMillis());
    }

    @computed
    get keys() {
        return this.Gantt.ActivityStore.Deliveries.map((d) => d.id);
    }

    @computed
    get yScale() {
        return scaleBand({
            domain: this.keys,
            range: [this.top, this.naturalHeight],
        });
    }

    get xScale() {
        return scaleLinear({
            domain: _.values(this.Gantt.Timeline.nodeSpan),
            range: [0, this.width],
        });
    }

    get xNow() {
        return this.xScale(getNormalizedNow().toMillis());
    }

    @computed
    get naturalHeight() {
        return this.data.length * this.rowHeight +this.rowHeight + this.top;
    }

    @computed
    get height() {
        return Math.max(this.naturalHeight, this.maxHeight);
    }

    @computed
    get dt() {
        return (
            this.Gantt.Timeline.nodeSpan.end -
            this.Gantt.Timeline.nodeSpan.start
        );
    }

    @computed
    get nodeSpanInterval() {
        return int.fromDateTimes(
            dt.fromMillis(this.Gantt.Timeline.nodeSpan.start),
            dt.fromMillis(this.Gantt.Timeline.nodeSpan.end),
        );
    }

    @computed
    get intervals() {
        return this.Gantt.TimelineIntervals.getIntervals(
            this.nodeSpanInterval,
            this.width
        );
    }
}

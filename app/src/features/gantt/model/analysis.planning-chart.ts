import { scaleBand, scaleLinear } from "@visx/scale";
import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { getNormalizedNow } from "~/util";
import { Gantt } from "./gantt";
export class PlanningChart {
    Gantt: Gantt;
    rowHeight: number = 40;
    top: number = 20;
    hBar: number = 25;
    tPad: number = 0.25;
    width: number = 0;
    maxHeight: number = 200;
    footerHeight: number = 100;
    constructor(Gantt: Gantt) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Gantt = Gantt;
    }

    get spacing(){
        return this.rowHeight - this.hBar;
    }

    get data() {
        return _.sortBy(
            this.Gantt.Store.ActivityStore.Deliveries,
            (d) => d.Interval.t.s
        );
    }

    get keys() {
        return this.Gantt.Store.ActivityStore.Deliveries.map((d) => d.id);
    }

    get yScale() {
        return scaleBand({
            domain: this.keys,
            range: [this.top, this.naturalHeight],
        });
    }

    get xScale() {
        return scaleLinear({
            domain: [
                this.Gantt.Timeline.Interval.t.s,
                this.Gantt.Timeline.Interval.t.f,
            ],
            range: [0, this.width],
        });
    }

    get xNow() {
        return this.xScale(getNormalizedNow().toMillis());
    }

    get naturalHeight() {
        return this.data.length * this.rowHeight + this.rowHeight + this.top;
    }

    get height() {
        return Math.max(this.naturalHeight, this.maxHeight);
    }

    get dt() {
        return this.Gantt.Timeline.dt;
    }

    get nodeSpanInterval() {
        return this.Gantt.Timeline.Interval.interval;
    }

    get intervals() {
        return this.Gantt.Timeline.Intervals.getIntervals(
            this.nodeSpanInterval,
            this.width
        );
    }
}

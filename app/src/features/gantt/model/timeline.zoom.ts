import { makeAutoObservable } from "mobx";
import { GanttTimeline } from "./timeline";
import { TIMELINE_PADDING } from "../constants";
import { Duration as dur } from "luxon";
export class GanttTimelineZoom {
    Timeline: GanttTimeline;

    min: number = 1;
    max: number = 75;

    constructor(Timeline: GanttTimeline) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Timeline = Timeline;
    }

    increment(sign: 1 | -1) {
        const amount = this.Timeline.dt * TIMELINE_PADDING;
        this.Timeline.Interval.increment(sign * amount, -sign * amount);
    }

    slide(value: number) {
        const days = this.Timeline.Gantt.Dimensions.timelineWidth / value;
        const diff = days - this.Timeline.Interval.counts.days;
        const dt = dur.fromObject({ days: diff / 2 }).toMillis();
        this.Timeline.Interval.increment(-dt, dt);
    }

    get zoom() {
        return Math.min(
            Math.max(
                this.Timeline.Gantt.Dimensions.timelineWidth /
                    this.Timeline.Interval.counts.days,
                this.min
            ),
            this.max
        );
    }
}

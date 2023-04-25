import { makeAutoObservable } from "mobx";
import { Gantt } from "./gantt";
import { GanttInterval } from "./shared/interval";
import { DateTime as dt } from "luxon";
import { TIMELINE_PADDING } from "../constants";
import { scaleLinear } from "@visx/scale";
import { GanttTimelineBoundary } from "./timeline.boundary";
import { GanttTimelineIntervals } from "./timeline.intervals";
import { GanttTimelineZoom } from "./timeline.zoom";
import { GanttTimelineDrag } from "./timeline.drag";
import { GanttTimelineSlide } from "./timeline.slide";

export class GanttTimeline {
    Gantt: Gantt;
    Interval: GanttInterval;
    Zoom: GanttTimelineZoom;
    Drag: GanttTimelineDrag;
    Intervals: GanttTimelineIntervals;
    Boundary: GanttTimelineBoundary;
    Slide: GanttTimelineSlide;

    constructor(Gantt: Gantt, start: string, end: string) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Gantt = Gantt;
        this.Zoom = new GanttTimelineZoom(this);
        this.Drag = new GanttTimelineDrag(this);
        this.Boundary = new GanttTimelineBoundary(this);

        this.Slide = new GanttTimelineSlide(this);
        this.init(start, end);
    }

    init(start: string, end: string) {
        const nodeSpan = this.getNodeSpan(start, end);
        this.Interval = new GanttInterval(nodeSpan.start, nodeSpan.end);
        this.Intervals = new GanttTimelineIntervals(this);
    }
    captureNodeSpan(){
        this.Interval.update(this.nodeSpan.start, this.nodeSpan.end)
    }

    getNodeSpan(start: string, end: string) {
        const days = dt
            .fromISO(end)
            .diff(dt.fromISO(start))
            .shiftTo("days").days;
        const padding = Math.ceil(days * TIMELINE_PADDING);
        return {
            start: dt
                .fromISO(start)
                .minus({ days: padding })
                .toISODate() as string,
            end: dt.fromISO(end).plus({ days: padding }).toISODate() as string,
        };
    }

    get nodeSpan() {
        const Plan = this.Gantt.Store.ActivityStore.Plan;
        if (!Plan) {
            return {
                start: this.Interval.start,
                end: this.Interval.end,
            };
        }
        return this.getNodeSpan(Plan.Interval.start, Plan.Interval.end)
        
    }

    get isCurrentlyNodeSpan() {
        return (
            this.Interval.start === this.nodeSpan.start &&
            this.Interval.end === this.nodeSpan.end
        );
    }

    get dt() {
        return this.Interval.dt.end.diff(this.Interval.dt.start).toMillis();
    }

    get xScale() {
        return scaleLinear({
            domain: [this.Interval.t.s, this.Interval.t.f],
            range: [-this.Boundary.x, this.Gantt.Dimensions.timelineWidth-this.Boundary.x],
        });
    }

    get dtScale() {
        return scaleLinear({
            domain: [0, this.dt],
            range: [0, this.Gantt.Dimensions.timelineWidth],
        });
    }

    get convert() {
        return {
            deltaToPixel: (t: number) => this.dtScale(t),
            pixelToDelta: (x: number) => this.dtScale.invert(x),
            timeToPixel: (t: number) => this.xScale(t),
            pixelToTime: (x: number) => this.xScale.invert(x),
        };
    }
}

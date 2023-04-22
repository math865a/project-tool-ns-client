import { makeAutoObservable } from "mobx";
import { GanttTimeline } from "./timeline";
import { ActivityBar } from "./activity/activity.bar";
import { scaleLinear } from "@visx/scale";
import { Granularity } from "../constants";
import { Duration as dur, Interval as int } from "luxon";
export class GanttTimelineBoundary {
    x: number = 0;
    private Timeline: GanttTimeline;
    private collisionListener: number | null = null;
    private rate: number = 0;

    constructor(Timeline: GanttTimeline) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Timeline = Timeline;
    }

    start(Bar: ActivityBar){
        this.startCollisionListener(Bar);
    }

    reset(){
        this.stopCollisionListener();
        this.updateRate(0)
    }

    get interval() {
        return int.fromDateTimes(
            this.Timeline.Interval.dt.start.plus(this.tDuration),
            this.Timeline.Interval.dt.end.plus(this.tDuration)
        );
    }

    private startCollisionListener(Bar: ActivityBar) {
        this.collisionListener = window.setInterval(
            () => this.updateBounds(Bar),
            150
        );
    }

    private stopCollisionListener() {
        if (this.collisionListener) {
            window.clearInterval(this.collisionListener);
            this.collisionListener = null;
        }
    }

    get slideZoneWidth() {
        return this.Timeline.Gantt.Dimensions.timelineWidth * 0.01;
    }

    private get throttleScale() {
        return scaleLinear({
            domain: [0, this.slideZoneWidth],
            range: [1, 10],
        });
    }

    get throttleStep() {
        switch (this.Timeline.Intervals.granularity) {
            case Granularity.q:
                return 0.5 * this.Timeline.Zoom.zoom;
            case Granularity.m:
                return 0.25 * this.Timeline.Zoom.zoom;
            default:
                return (1 / 4) * this.Timeline.Zoom.zoom;
        }
    }

    updateRate(value: number) {
        if (value !== 0) {
            const throttle = this.throttleScale(Math.abs(value));
            this.rate =
                (value / Math.abs(value)) * 0.5 * this.throttleStep * throttle;
        } else {
            this.rate = 0;
        }
    }

    private updateBounds(Bar: ActivityBar) {
        if (Bar.Delta.event !== null) {
            this.handleBoundaryCollision();
            switch (Bar.Delta.event) {
                case "move":
                    this.moveModifier(Bar);
                    break;
                case "resize-start":
                    this.resizeStartModifier(Bar);
                    break;
                case "resize-end":
                    this.resizeEndModifier(Bar);
                    break;
            }
        }
    }

    private moveModifier(Bar: ActivityBar) {
        Bar.syncModifier({
            dx: Bar.Delta.dx + this.rate,
            dw: 0,
        });
    }

    private resizeStartModifier(Bar: ActivityBar) {
        Bar.syncModifier({
            dx: Bar.Delta.dx + this.rate,
            dw: Bar.Delta.dw - this.rate,
        });
    }

    private resizeEndModifier(Bar: ActivityBar) {
        Bar.syncModifier({
            dx: Bar.Delta.dx,
            dw: Bar.Delta.dw + this.rate,
        });
    }

    private handleBoundaryCollision() {
        this.x += this.rate;
    }

    private get t() {
        return this.Timeline.convert.pixelToDelta(this.x);
    }

    private get tDuration() {
        return dur.fromMillis(this.t);
    }


}

import { makeAutoObservable } from "mobx";
import { GanttTimeline } from "./timeline";
import { HandlerArgs } from "@visx/drag/lib/useDrag";

export class GanttTimelineSlide {
    Timeline: GanttTimeline;
    lastDx: number = 0;
    isDragging: boolean = false;
    constructor(Timeline: GanttTimeline) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Timeline = Timeline;
    }

    handleDragStart = () => {
        this.lastDx =
            this.Timeline.Gantt.Dimensions.width -
            this.Timeline.Gantt.Dimensions.timelineWidth;
        this.isDragging = true;
    };

    handleDragMove = (args: HandlerArgs) => {
        const dx = this.lastDx - args.dx;
        if (dx !== 0) {
            const dt = this.Timeline.convert.pixelToDelta(dx);
            this.Timeline.Interval.increment(dt, dt);
        }
        this.lastDx = args.dx;
    };

    handleDragEnd = () => {
        this.lastDx =
            this.Timeline.Gantt.Dimensions.width -
            this.Timeline.Gantt.Dimensions.timelineWidth;

        this.isDragging = false;
    };

    get cursor() {
        return this.isDragging ? "grabbing" : "grab";
    }

    get handlers() {
        return {
            onDragStart: this.handleDragStart,
            onDragMove: this.handleDragMove,
            onDragEnd: this.handleDragEnd,
        };
    }
}

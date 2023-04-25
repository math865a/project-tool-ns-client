import { makeAutoObservable } from "mobx";
import { GanttTimeline } from "./timeline";
import { Duration as dur } from "luxon";
import { DragStartEvent } from "@dnd-kit/core";
import _ from "lodash";
import { ActivityBar } from "./activity";
import { ActivityDataBag } from "../columns/timeline/activity.cell/dnd";

export class GanttTimelineDrag {
    Timeline: GanttTimeline;
    Bar: ActivityBar | null;
    constructor(Timeline: GanttTimeline) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Timeline = Timeline;
    }

    get isDragging() {
        return this.Bar !== null;
    }

    calcSnap(d: number) {
        const snapOffset = d % this.snapWidth;
        return snapOffset > this.snapWidth / 2
            ? this.snapWidth - snapOffset
            : -snapOffset;
    }

    onDragStart = ({ active }: DragStartEvent) => {
        const bar = (active?.data.current as ActivityDataBag)?.Bar;
        if (bar) {
            this.Bar = bar;
            this.Timeline.Boundary.start(this.Bar);
        }
    };

    private get ActivityBars() {
        return this.Timeline.Gantt.Store.ActivityStore.Activities.map(
            (d) => d.Bar
        );
    }

    private get AllocationBars() {
        return this.Timeline.Gantt.Store.AssignmentStore.Allocations.map(
            (d) => d.Bar
        );
    }

    private get Bars() {
        return [...this.ActivityBars, ...this.AllocationBars];
    }

    private get SpectatorBars(){
        return this.Bars.filter((d) => d !== this.Bar);
    }

    onDragEnd = () => {
        if (!this.Bar) return;
        this.SpectatorBars.forEach((d) => d.save());
        this.Bar?.save()
        this.Timeline.Boundary.reset();
        this.Bar = null;
    };



    get snapWidth() {
        return this.Timeline.convert.deltaToPixel(
            dur.fromObject({ days: 1 }).toMillis()
        );
    }


    get dragEvent(){
        return this.Bar?.Delta.event;
    }

}

import { DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import { scaleLinear } from "@visx/scale";
import { Bar } from "gantt-models";
import { Granularity } from "gantt/constants";
import _ from "lodash";
import { DurationLike, DateTime as dt, Interval as int } from "luxon";
import { computed, runInAction } from "mobx";
import { Model, Ref, getRoot, model, modelAction, prop } from "mobx-keystone";
import { ActivityDataBag } from "../columns/timeline/activity.cell/dnd";
import { Gantt } from "./Gantt";

@model("timelineevent")
export default class TimelineEvent extends Model({
    dx: prop<number>(0).withSetter(),
    Bar: prop<Ref<Bar> | null>(null).withSetter(),
    rate: prop<number>(0).withSetter(),
    dxBoundary: prop<number>(0).withSetter(),
    barId: prop<string | null>(null).withSetter(),
    isDragging: prop<boolean>(false).withSetter(),
}) {
    boundarySlider: number | null = null;

    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    @computed
    get Dimensions() {
        return getRoot<Gantt>(this).Dimensions;
    }

    @computed
    get ActivityStore() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @computed
    get AllotmentStore() {
        return getRoot<Gantt>(this).AllotmentStore;
    }

    @computed
    get slideZoneWidth() {
        return this.Dimensions.timelineWidth * 0.01;
    }

    xDate(x: number) {
        const t = this.Timeline.xScale.invert(x);
        return dt.fromMillis(t, { zone: "utc" });
    }

    coordInterval(x1: number, x2: number) {
        const t1 = this.xDate(x1);
        const t2 = this.xDate(x2);
        return int.fromDateTimes(t1, t2);
    }

    closestCapacityDayInBounds(
        x: number,
        bounds: { x1: number; x2: number },
        diff: DurationLike = { days: 0 },
        forceDirection: "left" | "none" | "right" = "none",
        target?: number
    ) {
        const d = this.xDate(x).minus(diff);
        const { x1: bx1, x2: bx2 } = bounds;

        const relocateForwards = () => {
            const diff = d.weekday === 6 ? { days: 2 } : { days: 1 };
            const dCapacity = d.plus(diff);
            const xCapacity = this.Timeline.xScale(dCapacity.toMillis());
            if (xCapacity <= bx2) {
                return { diff: diff, x: xCapacity };
            }
            return { diff: { days: 0 }, x: x };
        };

        const relocateBack = () => {
            const diff = { days: -(d.weekday - 5) };
            const dCapacity = d.plus(diff);
            const xCapacity = this.Timeline.xScale(dCapacity.toMillis());
            if (xCapacity >= bx1) {
                return { diff: diff, x: xCapacity };
            }
            return { diff: { days: 0 }, x: x };
        };

        let xNew: { diff: DurationLike; x: number } = {
            diff: { days: 0 },
            x: x,
        };
        return xNew;
    }

    @computed
    get throttleScale() {
        return scaleLinear({
            domain: [0, this.slideZoneWidth],
            range: [1, 10],
        });
    }

    @computed
    get TimelineIntervals(){
        return getRoot<Gantt>(this).TimelineIntervals
    }

    @computed
    get throttleStep() {
        switch (this.TimelineIntervals.granularity) {
            case Granularity.q:
                return 0.5*this.Timeline.dpx;
            case Granularity.m:
                return 0.25*this.Timeline.dpx;
            default:
                return (1 / 4) * this.Timeline.dpx;
        }
    }

    @modelAction
    updateRate(value: number) {
        if (value !== 0) {
            const throttle = this.throttleScale(Math.abs(value));
            this.setRate(
                (value / Math.abs(value)) * 0.5 * this.throttleStep * throttle
            );
        } else {
            this.setRate(0);
        }
    }

    @modelAction
    updateBounds = () => {
        const Bar = this.activeBar;
        if (Bar && Bar.event) {
            this.setDxBoundary(this.dxBoundary + this.rate);
            if (Bar.event === "move") {
                Bar.syncModifier(
                    {
                        dx: Bar.dx + this.rate,
                        dw: 0, //this.Bar.dw + this.dBoundary,
                    },
                    Bar.event
                );
                this.Timeline.handleBoundaryCollision(this.dxBoundary);
            } else if (Bar.event === "resize-start") {
                Bar.syncModifier(
                    {
                        dx: Bar.dx + this.rate,
                        dw: Bar.dw - this.rate,
                    },
                    Bar.event
                );
                this.Timeline.handleBoundaryCollision(this.dxBoundary);
            } else if (Bar.event === "resize-end") {
                Bar.syncModifier(
                    {
                        dx: Bar.dx,
                        dw: Bar.dw + this.rate,
                    },
                    Bar.event
                );
                this.Timeline.handleBoundaryCollision(this.dxBoundary);
            }
        }
    };

    @computed
    get Bars() {
        return _.map(this.ActivityStore.Activities, (d) => d.Bar);
    }

    @computed
    get AllocationBars() {
        return this.AllotmentStore.Allocations.map((d) => d.Bar);
    }

    @computed
    get EventBars() {
        return this.Bars.filter((d) => d.hasEvent && d.hasChanged);
    }

    @computed
    get EventSource() {
        return this.Bars.find((d) => d.event !== null) ?? null;
    }

    @computed
    get activeBar() {
        return this.ActivityStore.Activities.find((d) => d.id === this.barId)
            ?.Bar;
    }

    @computed
    get eventType() {
        if (this.EventSource) {
            return this.EventSource.event;
        }
        return null;
    }
    /*
    onAttachedToRootStore() {
        reaction(
            () => this.EventSource,
            (eventSource) => this.initDrag(eventSource),
            { equals: comparer.structural }
        );
    }

    @modelAction
    initDrag(B: Bar | null) {
        if (B) {
            this.setIsDragging(true);
            this.setBar(Bar.ref(B));
            this.setBoundarySlider(setInterval(this.updateBounds, 150));
        }
    }
*/
    @modelAction
    onDragStart = ({ active }: DragStartEvent) => {
        const bar = (active?.data.current as ActivityDataBag)?.Bar;
        if (bar) {
            this.setBarId(bar.Activity.id);
            this.setIsDragging(true);
            this.setBar(Bar.ref(bar));
            this.boundarySlider = window.setInterval(this.updateBounds, 150);
        }
    };

    @modelAction
    onDragMove = (event: DragMoveEvent) => {
        this.setDx(event.delta.x);
    };

    @modelAction
    onDragEnd = (event: DragEndEvent) => {
        /*const updates = _.map(this.EventBars, Bar => Bar.save()).filter(
            (d) => d !== undefined
        ) as {
            _id: string;
            startDate: number;
            endDate: number;
        }[];
        this.Bar?.reset()
        if (updates.length > 0) {
            this.Gantt.Transport.saveEpochs(updates);
        }*/
        this.AllocationBars.forEach((Bar) => Bar.save());
        this.Bars.forEach((Bar) => Bar.save());

        this.reset();
    };

    @modelAction
    reset() {
        if (this.activeBar) {
            this.activeBar.reset();
        }
        this.setBar(null);
        this.setBarId(null);
        this.setIsDragging(false);

        runInAction(() => {
            const dt = this.Timeline.dtScale.invert(this.Timeline.dxBounds);
            this.Timeline.setDs(
                this.Timeline.ds +
                    dt
            );
            this.Timeline.setDf(this.Timeline.df + dt)
        })

        this.Timeline.setDxBounds(0);
        this.setDxBoundary(0);
        this.setRate(0);
        this.setBarId(null);

        if (this.boundarySlider) {
            clearInterval(this.boundarySlider);
            this.boundarySlider = null;
            // this.Timeline.setDs(this.Timeline.ds - this.Timeline.dtScale.invert(this.dxBoundary))
        }
    }
}

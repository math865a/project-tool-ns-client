import { Allocation, Bar } from "gantt-models";
import { ROW_HEIGHT } from "gantt/constants";
import { Gantt } from "gantt/controllers/Gantt";
import { type Coord, type Delta, type TimelineEventType } from "gantt/types";
import _ from "lodash";
import { computed } from "mobx";
import {
    Model,
    getParent,
    getRoot,
    model,
    modelAction,
    prop,
} from "mobx-keystone";

@model("allocation-bar")
export class AllocationBar extends Model(
    {
        isHovering: prop<boolean>(false).withSetter(),
        event: prop<TimelineEventType | null>(null).withSetter(),
        dx: prop<number>(0).withSetter(),
        dw: prop<number>(0).withSetter(),
        dxLast: prop<number>(0).withSetter(),
        dragDirection: prop<"left" | "none" | "right">("none").withSetter(),
    },
    { valueType: true }
) {
    @computed
    get Allocation() {
        return getParent<Allocation>(this) as Allocation;
    }

    @computed
    get TaskBar() {
        return getParent<Allocation>(this)?.Assignment?.Task?.Bar as Bar;
    }

    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    @computed
    get x1() {
        return _.round(this.Timeline.xScale(this.Allocation.Interval.sNorm), 0);
    }

    @computed
    get x2() {
        return _.round(this.Timeline.xScale(this.Allocation.Interval.fNorm), 0);
    }

    @computed
    get w0() {
        return this.x2 - this.x1;
    }

    @computed
    get w() {
        return this.x2 + this.dw - this.x1 + this.dx;
    }

    @computed
    get h() {
        return ROW_HEIGHT * 0.6;
    }

    @computed
    get y() {
        return (ROW_HEIGHT - this.h) / 2;
    }

    @computed
    get hasChanged() {
        return this.coord.x !== this.x1 || this.coord.w !== this.w0;
    }

    @modelAction
    save() {
        if (this.hasChanged) {
            this.Allocation.Interval.updatePeriodFromCoords(
                this.coord.x,
                this.coord.w
            );
            this.reset();
        }
    }

    @modelAction
    reset() {
        this.setDx(0);
        this.setDw(0);
        this.setDxLast(0);
        this.setEvent(null);
        this.setDragDirection("none");
    }

    @modelAction
    updateDelta({ dx, dw }: Delta) {
        this.setDxLast(this.dx);
        this.setDx(dx);
        this.setDw(dw);
    }

    @modelAction
    updateDragDirection() {
        if (this.dx > this.dxLast) {
            this.setDragDirection("right");
        } else if (this.dx < this.dxLast) {
            this.setDragDirection("left");
        } else if (this.dx > 0) {
            this.setDragDirection("right");
        } else if (this.dx < 0) {
            this.setDragDirection("left");
        } else {
            this.setDragDirection("none");
        }
    }

    @modelAction
    syncDrag(
        dx: number,
        type: TimelineEventType,
        direction: "left" | "right" | "none"
    ) {
        if (!this.TaskBar) return;
        this.setDragDirection(direction);
        this.setEvent(type);
        const p = this.TaskBar.p0;
        switch (type) {
            case "move":
                this.calcMove(dx);
                break;
            case "resize-start":
                this.calcResizeStart(dx);
                break;
            case "resize-end":
                this.calcResizeEnd(dx);
                break;
        }
    }

    @modelAction
    calcMove(dx: number) {
        this.updateDelta({ dx: dx, dw: 0 });
    }

    @modelAction
    calcResizeStart(dx: number) {
        if (this.w0 - dx < this.Timeline.wDay) {
            dx = this.w0 - this.Timeline.wDay;
        }

        this.updateDelta({
            dx: dx,
            dw: -dx,
        });
    }

    @modelAction
    calcResizeEnd(dx: number) {
        if (this.w0 + dx < this.Timeline.wDay) {
            dx = this.Timeline.wDay - this.w0;
        }
        this.updateDelta({
            dx: 0,
            dw: dx,
        });
    }

    @modelAction
    syncWithTask(c: Coord, event: TimelineEventType) {
        if (event === "move") {
            this.syncWithBarMove(c);
        } else if (event === "resize-start") {
            this.syncWithBarResizeStart(c);
        } else {
            this.syncWithBarResizeEnd(c);
        }
    }

    @computed
    get bounds() {
        return {
            x: this.TaskBar?.coord.x ?? this.x1,
            w: (this.TaskBar?.w0 ?? this.w0) + (this.TaskBar?.dw ?? this.dw),
        };
    }

    @computed
    get barDelta() {
        if (this.TaskBar?.hasEvent) {
            if (this.Timeline.TimelineEvent.eventType === "move") {
                return this.syncWithBarMove(this.bounds);
            } else if (this.Timeline.TimelineEvent.eventType === "resize-end") {
                return this.syncWithBarResizeEnd(this.bounds);
            } else if (
                this.Timeline.TimelineEvent.eventType === "resize-start"
            ) {
                return this.syncWithBarResizeStart(this.bounds);
            }
        }

        return {
            dx: 0,
            dw: 0,
        };
    }

    syncWithBarResizeStart({ x, w }: Coord) {
        let dx = 0;
        let dw = 0;
        if (x > this.x1) {
            dx = x - this.x1;
            const x2 = this.x1 + dx + this.w0;
            if (x2 > x + w) {
                dw = x + w - x2;
            }
        }
        return { dx: _.round(dx, 0), dw: _.round(dw, 0) };
    }

    syncWithBarResizeEnd({ x, w }: Coord) {
        let dx = 0;
        let dw = 0;
        if (x + w <= this.x2) {
            dx = x + w - this.x2;
            const x1 = this.x1 + dx;
            if (x1 <= x) {
                dx = x - this.x1;
                dw = w - this.w0;
            }
        }
        return { dx: _.round(dx, 0), dw: _.round(dw, 0) };
    }

    syncWithBarMove({ x, w }: Coord) {
        const pb = {
            x1: x,
            x2: x + w,
        };

        let dx = this.dx;
        if (pb.x1 > this.x1) {
            dx = pb.x1 - this.x1;
        }
        if (pb.x2 < this.x2) {
            dx = pb.x2 - this.x2;
        }

        const { diff: d1, x: x1 } =
            this.Timeline.TimelineEvent.closestCapacityDayInBounds(
                this.x1 + dx,
                pb
            );
        const { x: x2 } =
            this.Timeline.TimelineEvent.closestCapacityDayInBounds(
                this.x1 + dx + this.w0,
                pb,
                d1
            );
        return {
            dx: _.round(x1 - this.x1, 0),
            dw: _.round(x2 - x1 - this.w0, 0),
        };
    }

    @computed
    get delta() {
        if (this.barDelta.dx || this.barDelta.dw) {
            return this.barDelta;
        }
        return {
            dx: this.dx,
            dw: this.dw,
        };
    }
    @computed
    get coord() {
        return {
            x: _.round(this.x1 + this.delta.dx, 0),
            w: _.round(this.w0 + this.delta.dw, 0),
        };
    }
    @computed
    get transform() {
        return {
            x: this.delta.dx,
            y: 0,
            scaleX: 0,
            scaleY: 0,
        };
    }
}

import { autorun, makeAutoObservable, toJS } from "mobx";
import { Allocation } from "./allocation.model";
import { GanttBarDelta } from "../shared";
import { ROW_HEIGHT } from "../../constants";
import { Coord, TimelineEventType } from "../../types";
import _ from "lodash";

type DragDirection = "left" | "none" | "right";

export class AllocationBar {
    Allocation: Allocation;
    public Delta: GanttBarDelta;
    dragDirection: DragDirection = "none";
    constructor(Allocation: Allocation) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Allocation = Allocation;
        this.Delta = new GanttBarDelta(
            this.Allocation.Assignment.Store.GanttStore.Gantt.Timeline,
            this.Allocation.Interval
        );
    } 

    get TaskBar() {
        return this.Allocation.Assignment.Task?.Bar;
    }

    get Timeline() {
        return this.Allocation.Assignment.Store.GanttStore.Gantt.Timeline;
    }

    get iRect() {
        const x1 = this.Timeline.convert.timeToPixel(
            this.Allocation.Interval.t.s
        );
        const x2 = this.Timeline.convert.timeToPixel(
            this.Allocation.Interval.t.f
        );
        const h = ROW_HEIGHT * 0.6;
        return {
            x1: x1,
            x2: x2,
            w: x2 - x1,
            h: h,
            y: (ROW_HEIGHT - h) / 2,
        };
    }

    save() {
        this.Delta.save(this.rect.x1, this.rect.x2);
        this.dragDirection = "none";
    }

    updateDragDirection() {
        const { dx, dxLast } = this.Delta;
        if (dx > dxLast) {
            this.dragDirection = "right";
        } else if (dx < dxLast) {
            this.dragDirection = "left";
        } else if (dx > 0) {
            this.dragDirection = "right";
        } else if (dx < 0) {
            this.dragDirection = "left";
        } else {
            this.dragDirection = "none";
        }
    }

    get bounds() {
        return {
            x: this.TaskBar?.rect.x1 ?? this.iRect.x1,
            w:
                (this.TaskBar?.iRect.w ?? this.iRect.w) +
                (this.TaskBar?.Delta.dw ?? this.Delta.dw),
        };
    }

    get barDelta() {
        if (this.TaskBar?.hasEvent) {
            switch (this.Timeline.Drag.dragEvent) {
                case "move":
                    return this.syncWithBarMove(this.bounds);
                case "resize-end":
                    return this.syncWithBarResizeEnd(this.bounds);
                case "resize-start":
                    return this.syncWithBarResizeStart(this.bounds);
            }
        }

        return {
            dx: 0,
            dw: 0,
        };
    }

    syncDrag(
        dx: number,
        type: TimelineEventType,
        direction: "left" | "right" | "none"
    ) {
        if (!this.TaskBar) return;
        this.dragDirection = direction;
        this.Delta.event = type;

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

    calcMove(dx: number) {
        this.Delta.updateDelta({ dx: dx, dw: 0 });
    }

    calcResizeStart(dx: number) {
        if (this.iRect.w - dx < this.Timeline.Drag.snapWidth) {
            dx = this.iRect.w - this.Timeline.Drag.snapWidth;
        }

        this.Delta.updateDelta({
            dx: dx,
            dw: -dx,
        });
    }

    calcResizeEnd(dx: number) {
        if (this.iRect.w + dx < this.Timeline.Drag.snapWidth) {
            dx = this.Timeline.Drag.snapWidth - this.iRect.w;
        }
        this.Delta.updateDelta({
            dx: 0,
            dw: dx,
        });
    }

    syncWithTask(c: Coord, event: TimelineEventType) {
        if (event === "move") {
            this.syncWithBarMove(c);
        } else if (event === "resize-start") {
            this.syncWithBarResizeStart(c);
        } else {
            this.syncWithBarResizeEnd(c);
        }
    }

    syncWithBarResizeStart({ x, w }: Coord) {
        let dx = 0;
        let dw = 0;
        if (x > this.iRect.x1) {
            dx = x - this.iRect.x1;
            const x2 = this.iRect.x1 + dx + this.iRect.w;
            if (x2 > x + w) {
                dw = x + w - x2;
            }
        }
        return { dx: _.round(dx, 0), dw: _.round(dw, 0) };
    }

    syncWithBarResizeEnd({ x, w }: Coord) {
        let dx = 0;
        let dw = 0;
        if (x + w <= this.iRect.x2) {
            dx = x + w - this.iRect.x2;
            const x1 = this.iRect.x1 + dx;
            if (x1 <= x) {
                dx = x - this.iRect.x1;
                dw = w - this.iRect.w;
            }
        }
        return { dx: _.round(dx, 0), dw: _.round(dw, 0) };
    }

    syncWithBarMove({ x, w }: Coord) {
        const pb = {
            x1: x,
            x2: x + w,
        };

        let dx = this.Delta.dx;
        if (pb.x1 > this.iRect.x1) {
            dx = pb.x1 - this.iRect.x1;
        }
        if (pb.x2 < this.iRect.x2) {
            dx = pb.x2 - this.iRect.x2;
        }
        const x1 = this.iRect.x1 + dx;
        const x2 = this.iRect.x2 + dx;

        return {
            dx: dx,
            dw: x2 - x1 - this.iRect.w,
        };
    }

    get delta() {
        if (this.barDelta.dx || this.barDelta.dw) {
            return this.barDelta;
        }
        return {
            dx: this.Delta.dx,
            dw: this.Delta.dw,
        };
    }

    get rect() {
        const { x1, x2, y, h } = this.iRect;
        const { dx, dw } = this.delta;

        const x1Rect = x1 + dx;
        const x2Rect = x2 + dx + dw;

        return {
            ...this.iRect,
            x1: x1Rect,
            x2: x2Rect,
            w: x2Rect - x1Rect,
        };
    }

    get transform() {
        return {
            x: this.delta.dx,
            y: 0,
            scaleX: 1,
            scaleY: 1,
        };
    }
}

import { makeAutoObservable } from "mobx";
import { Delta, TimelineEventType } from "../../types";
import { GanttTimeline } from "../timeline";
import { GanttInterval } from "./interval";

export class GanttBarDelta {
    event: TimelineEventType | null = null;
    dx: number = 0;
    dw: number = 0;
    dxLast: number = 0;
    constructor(
        private Timeline: GanttTimeline,
        private Interval: GanttInterval
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateDelta({ dx, dw }: Partial<Delta>) {
        if (dx) {
            this.dx = dx;
            this.dxLast = dx;
        }
        if (dw) this.dw = dw;
    }

    private reset() {
        this.dx = 0;
        this.dxLast = 0;
        this.dw = 0;
        this.event = null;
    }

    save(x1: number, x2: number) {
        const result = {
            start: this.Timeline.convert.pixelToTime(x1),
            end: this.Timeline.convert.pixelToTime(x2),
        };
        this.Interval.update(result.start, result.end);
        this.reset();
    }

    get snap() {
        return {
            dx: this.Timeline.Drag.calcSnap(this.dx),
            dw: this.Timeline.Drag.calcSnap(this.dw),
        };
    }
}

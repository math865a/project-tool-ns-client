import { makeAutoObservable } from "mobx";
import { Activity } from "./activity.model";
import { Delta, TimelineEventType } from "../../types";
import { ROW_HEIGHT } from "../../constants";
import _ from "lodash";
import { GanttBarDelta } from "../shared";

export class ActivityBar {
    Activity: Activity;
    Delta: GanttBarDelta;
    hRatio: number;

    constructor(Activity: Activity) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Activity = Activity;
        this.Delta = new GanttBarDelta(
            this.Activity.Store.GanttStore.Gantt.Timeline,
            this.Activity.Interval
        );
        this.hRatio = this.Activity.kind === "Delivery" ? 0.3 : 0.45;
    }

    syncModifier(delta: Delta, type?: TimelineEventType) {
        if (type) {
            this.Delta.event = type;
        }
        this.Delta.updateDelta(delta);
    }

    save() {
        this.Delta.save(this.rect.x1, this.rect.x2);
    }

    get Timeline() {
        return this.Activity.Store.GanttStore.Gantt.Timeline;
    }

    private get Interval() {
        return this.Activity.Interval;
    }

    private get Parent() {
        return this.Activity.Parent?.Bar;
    }

    private get Children() {
        return this.Activity.Children.map((child) => child.Bar);
    }

    get iRect() {
        const x1 = this.Timeline.convert.timeToPixel(this.Interval.t.s);
        const x2 = this.Timeline.convert.timeToPixel(this.Interval.t.f);
        const h = ROW_HEIGHT * this.hRatio;
        return {
            x1: x1,
            x2: x2,
            w: x2 - x1,
            h: h,
            y: (ROW_HEIGHT - h) / 2,
        };
    }

    private get events() {
        return {
            hasChildEvent: this.Children.some(
                (child) => child.Delta.event !== null
            ),
            hasParentEvent: this.Parent?.Delta.event !== null,
            hasEvent: this.Delta.event !== null,
        };
    }

    get hasEvent() {
        return _.some(this.events);
    }

    get ownRect() {
        const { x1, x2, w, h, y } = this.iRect;
        return {
            x1: x1 + this.Delta.dx,
            x2: x2 + this.Delta.dx + this.Delta.dw,
            w: w + this.Delta.dw,
            h: h,
            y: y,
        };
    }

    private get childrenRect() {
        const minChild = _.minBy(this.Children, (d) => d.rect.x1) as ActivityBar | undefined;
        const maxChild = _.maxBy(this.Children, (d) => d.rect.x2) as ActivityBar | undefined;

        if (!minChild || !maxChild) {
            return this.ownRect;
        }

        return {
            ...this.iRect,
            x1: minChild.ownRect.x1,
            x2: maxChild.ownRect.x2,
            w: maxChild.ownRect.x2 - minChild.ownRect.x1,
        };
    }

    private get parentRect() {
        if (this.Parent) {
            const dx = this.Parent.ownRect.x1 - this.Parent.iRect.x1;
            const x = this.iRect.x1 + dx;
            return {
                ...this.iRect,
                x1: x,
            };
        }
        return this.iRect;
    }

    get rect() {
        if (this.events.hasChildEvent) {
            return this.childrenRect;
        } else if (this.events.hasParentEvent) {
            return this.parentRect;
        } else if (this.events.hasEvent) {
            return this.ownRect;
        }
        return this.iRect;
    }

    get transform() {
        return {
            x: this.rect.x1 - this.iRect.x1,
            y: 0,
            scaleX: 1,
            scaleY: 1,
        };
    }

    get opacity() {
        return this.hasChanged || this.Delta.event === "move" ? 0.4 : 1;
    }

    private get hasChanged() {
        return !_.isEqual(this.iRect, this.rect);
    }
}

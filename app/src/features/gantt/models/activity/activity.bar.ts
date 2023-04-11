import _ from "lodash";
import { computed } from "mobx";
import {
    detach,
    getParent,
    getRoot,
    idProp,
    Model,
    model,
    modelAction,
    prop, rootRef
} from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { ROW_HEIGHT } from "gantt/constants";
import { Delta, TimelineEventType } from "gantt/types";
import { Activity } from "./activity";
import { ActivatorStyles } from "./bar/activator-style";
@model("bar")
export class Bar extends Model(
    {
        id: idProp.typedAs<string>(),
        dx: prop<number>(0).withSetter(),
        dw: prop<number>(0).withSetter(),
        dxSnap: prop<number>(0).withSetter(),
        dwSnap: prop<number>(0).withSetter(),
        dxLast: prop<number>(0).withSetter(),
        event: prop<TimelineEventType | null>(null).withSetter(),
        isHovering: prop<boolean>(false).withSetter(),
        ActivatorStyle: prop<ActivatorStyles>(() => new ActivatorStyles({})),
    },
    { valueType: true }
) {

    @computed
    get hRatio(){
        if (this.Activity.kind === "Delivery") return 0.25;
        return 0.45
    }
    //CONTROLLERS

    @computed
    get shouldSave() {
        return !this.hasEvent && this.hasChanged;
    }

    @computed
    get hasChanged() {
        return this.coord.x !== this.p0.x1 || this.coord.w !== this.w0;
    }

    @computed
    get Activity() {
        return getParent<Activity>(this) as Activity;
    }

    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    //STATIC COORDIANTES

    @computed
    get p0() {
        return {
            x1: this.Timeline.xScale(this.Activity.Interval.sNorm),
            x2: this.Timeline.xScale(this.Activity.Interval.fNorm),
        };
    }

    @computed
    get w0() {
        return this.p0.x2 - this.p0.x1;
    }

    @computed
    get h() {
        return ROW_HEIGHT * this.hRatio;
    }

    @computed
    get y() {
        return (ROW_HEIGHT - this.h) / 2;
    }

    //RELATION

    @computed
    get Parent() {
        return this.Activity.Parent?.Bar;
    }
    @computed
    get Children() {
        return this.Activity.Children.map((d) => d.Bar);
    }

    //EVENTS

    @computed
    get hasChildEvent(): boolean {
        return _.some(
            this.Children,
            (d) => d.event !== null || d.hasChildEvent
        );
    }

    @computed
    get hasParentEvent(): boolean {
        if (this.Parent) {
            return this.Parent.event !== null || this.Parent.hasParentEvent;
        }
        return false;
    }

    @computed
    get hasEvent() {
        return this.hasChildEvent || this.hasParentEvent || this.event !== null;
    }

    //ACTIONS

    @modelAction
    save() {
        if (this.hasChanged) {
            this.Activity.Interval.updatePeriodFromCoords(
                this.coord.x,
                this.coord.w
            );
        }
    }

    @modelAction
    reset() {
        this.setEvent(null);
        this.dx = 0;
        this.dw = 0;
        this.dxLast = 0;
    }

    @modelAction
    updateDelta({ dx, dw }: Partial<Delta>) {
        this.dxLast = this.dx;
        if (dx !== undefined) {
            this.setDx(dx);
            this.setDxSnap(this.calcSnap(this.dx));
        }
        if (dw !== undefined) {
            this.setDw(dw);
            this.setDwSnap(this.calcSnap(this.dw));
        }
    }

    @modelAction
    syncModifier = ({ dx, dw }: Delta, type: TimelineEventType) => {
        this.setEvent(type);
        this.updateDelta({ dx: dx, dw: dw });
    };

    calcSnap(d: number, f: number = 0) {
        return Math.round(
            Math.round((d + f) / this.Timeline.dpx) * this.Timeline.dpx
        );
    }


    @computed
    get staticCoord() {
        return {
            x: this.p0.x1,
            w: this.w0,
        };
    }

    @computed
    get ownCoord() {
        return {
            x: this.p0.x1 + this.dxSnap,
            w: this.w0 + this.dwSnap,
        };
    }

    @computed
    get childEndpoints() {
        const minChild = _.minBy(this.Children, (d) => d.coord.x);
        const maxChild = _.maxBy(this.Children, (d) => d.coord.x + d.coord.w);
        let x: number = this.p0.x1;
        let w: number = this.w0;
        if (minChild) {
            x = minChild.coord.x;
        }
        if (maxChild) {
            w = maxChild.coord.x + maxChild.coord.w - x;
        }
        return {
            x: x,
            w: w,
        };
    }

    @computed
    get parentTransform() {
        if (this.Parent) {
            const dx = this.Parent.coord.x - this.Parent.p0.x1;
            const x = this.p0.x1 + dx;
            return {
                x: x,
                w: this.w0,
            };
        }
        return this.staticCoord;
    }

    @computed
    get coord(): { x: number; w: number } {
        if (this.event !== null) return this.ownCoord;
        if (this.hasChildEvent) return this.childEndpoints;
        if (this.hasParentEvent) return this.parentTransform;
        return this.staticCoord;
    }

    @computed
    get transform() {
        return {
            x: this.coord.x - this.p0.x1,
            y: 0,
            scaleX: 1,
            scaleY: 1,
        };
    }

    @computed
    get opacity(){
        return this.hasChanged || this.event === "move" ? 0.4 : 1
    }

    


    static ref = rootRef<Bar>("barRef", {
        onResolvedValueChange(ref, n, o) {
            if (o && !n) {
                detach(ref);
            }
        },
    });
}

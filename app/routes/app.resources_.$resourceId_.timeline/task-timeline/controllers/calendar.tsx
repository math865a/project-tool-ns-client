import { getNormalizedNow } from "~/util";
import { computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { TimelineController } from "./controller";
import {Duration as dur, Interval as int, DateTime as dt} from "luxon"
import { HandlerArgs } from "@visx/drag/lib/useDrag";
import _ from "lodash";

@model('capacity-calendar')
export class TimelineCalendar extends Model({
    dpx: prop<number>(5).withSetter(),
    tStart: prop<number>(() => getNormalizedNow().minus({weeks: 3}).toMillis()).withSetter(),
    pad: prop<number>(0.75).withSetter(),
    isDragging: prop<boolean>(false).withSetter(),
    lastDx: prop<number>(0).withSetter(),
    today: prop<number>(() => getNormalizedNow().toMillis())
}) {
    @computed
    get Dimensions() {
        return getRoot<TimelineController>(this).Dimensions;
    }

    @computed
    get tDays() {
        return this.Dimensions.chartWidth / this.dpx;
    }

    @computed
    get t() {
        return dur.fromObject({ days: this.tDays }).toMillis();
    }

    @computed
    get tEnd() {
        return this.tStart + this.t;
    }

    @computed
    get visibleInterval() {
        return int.fromDateTimes(
            dt.fromMillis(this.tStart),
            dt.fromMillis(this.tEnd)
        );
    }

    @computed
    get Store(){
        return getRoot<TimelineController>(this).Store
    }

    @computed
    get isHoveringTask(){
        return _.some(this.Store.Workpackages, d => d.isHoveringTask)
    }

    @modelAction
    onDragStart = () => {
        if (this.isHoveringTask) return;
        this.setLastDx(0);
        this.setIsDragging(true)
    };

    @modelAction
    onDragMove = (args: HandlerArgs) => {
        if (!this.isDragging) return
        const dx = this.lastDx - args.dx;

        if (dx === 0) return;
        const tIncrement =
            (dx / Math.abs(dx)) * this.Dimensions.tScale.invert(Math.abs(dx));
        this.setTStart(this.tStart + tIncrement);
        this.setLastDx(args.dx);
    };

    @modelAction
    onDragEnd = () => {
        this.setLastDx(0);
        this.setIsDragging(false)
    };

    @computed
    get xToday(){
        return this.Dimensions.xScale(this.today)
    }

}

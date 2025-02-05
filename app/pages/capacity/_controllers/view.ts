import { HandlerArgs } from "@visx/drag/lib/useDrag";
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import _ from "lodash";
import { DateTime as dt, Interval as int } from "luxon";
import { computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { CapacityView } from "~/pages/capacity/_models";
import { CapacityBoard } from "./_board";
import { RowMode, ViewMode } from "~/pages/capacity/_definitions";

export interface ICapacityInterval {
    interval: int;
    ts: string;
    x: number;
    w: number;
}

@model("capacity-board-view")
export class View extends Model({
    viewMode: prop<ViewMode>(() => ViewMode.Month).withSetter(),
    rowMode: prop<RowMode>(() => RowMode.Resource).withSetter(),
    capacityView: prop<string | null>(null).withSetter(),
    isDragging: prop<boolean>(false).withSetter(),
    lastDx: prop<number>(0).withSetter(),
}) {
    baseColor = "#f5f5f5";
    getCapacityColor = interpolateRgb.gamma(3)(this.baseColor, "#58B09C");
    getOverbookedColor = interpolateRgb.gamma(6)("#D57272", "#E00000");
    viewModeMap = {
        [ViewMode.Day]: "Dag",
        [ViewMode.Week]: "Uge",
        [ViewMode.Month]: "Måned",
    };

    @computed
    get Filter() {
        return getRoot<CapacityBoard>(this).Filter;
    }

    @computed
    get CapacityViewStore() {
        return getRoot<CapacityBoard>(this).CapacityViewStore;
    }

    @computed
    get CapacityView() {
        if (!this.capacityView) return null;
        return (
            this.CapacityViewStore.Views.find(
                (d) => d.id === this.capacityView
            ) ?? null
        );
    }

    @computed
    get hasFiltered() {
        if (this.CapacityView) {
            return this.CapacityView.hasChanged;
        }
        return (
            this.Filter.RowFilter.filterCount > 0 ||
            this.Filter.BookingStageFilter.filterState.length !== 2 ||
            this.Filter.RowFilter.showRowsWithoutBookings
        );
    }

    @computed
    get Calendar() {
        return getRoot<CapacityBoard>(this).Calendar;
    }

    @computed
    get Dimensions() {
        return getRoot<CapacityBoard>(this).Dimensions;
    }

    @computed
    get Columns(): ICapacityInterval[] {
        return _.map(this.Calendar.rawIntervals, (d) => {
            const x = this.Dimensions.xScale((d.start as dt).toMillis());
            const w = this.Dimensions.xScale((d.end as dt).toMillis()) - x;
            return {
                interval: d,
                ts: (d.start as dt).toFormat("yyyy-MM-dd"),
                x: x,
                w: w,
            };
        });
    }

    @modelAction
    setView = (view: CapacityView | null) => {
        if (view === null || this.capacityView === view.id) {
            this.setCapacityView(null);
            this.Filter.RowFilter.clearFilter();
            this.Filter.BookingStageFilter.clearFilter();
            this.Filter.RowFilter.setShowRowsWithoutBookings(false);
        } else {
            this.setCapacityView(view.id);
            this.Filter.RowFilter.setRowFilter(_.cloneDeep(view.resources));
            this.Filter.BookingStageFilter.setFilterState(
                _.cloneDeep(view.bookingStages)
            );
            this.Filter.RowFilter.setShowRowsWithoutBookings(
                _.cloneDeep(view.showResourcesWithNoBookings)
            );
        }
    };

    @modelAction
    updateViewMode(viewMode: ViewMode) {
        switch (viewMode) {
            case ViewMode.Month:
                this.Calendar.setDpx(3.75);
                this.setViewMode(ViewMode.Month);
                break;
            case ViewMode.Week:
                this.Calendar.setDpx(16);
                this.setViewMode(ViewMode.Week);
                break;
            default:
                this.Calendar.setDpx(100);
                this.setViewMode(ViewMode.Day);
        }
    }

    getCellBackground(ratio: number) {
        if (ratio > 1) {
            const rat = ratio - 1;
            const rawColor = this.getOverbookedColor(rat);
            const d3Color = color(rawColor);
            if (!d3Color) return "#fff";
            return d3Color.formatHex();
        } else if (ratio !== 0 && !ratio) {
            return "#525252";
        }
        const rawColor = this.getCapacityColor(ratio);
        const d3Color = color(rawColor);
        if (!d3Color) return "#fff";
        return d3Color.formatHex() + "CC";
    }

    @modelAction
    onDragStart = () => {
        this.setLastDx(0);
    };

    @modelAction
    onDragMove = (args: HandlerArgs) => {
        const dx = this.lastDx - args.dx;

        if (dx === 0) return;
        const tIncrement =
            (dx / Math.abs(dx)) * this.Dimensions.tScale.invert(Math.abs(dx));
        this.Calendar.setTStart(this.Calendar.tStart + tIncrement);
        this.setLastDx(args.dx);
    };

    @modelAction
    onDragEnd = () => {
        this.setLastDx(0);
    };
}

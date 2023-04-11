import { scaleLinear, scaleUtc } from "@visx/scale";
import { computed } from "mobx";
import { getRoot, Model, model, prop } from "mobx-keystone";
import { HEADER_HEIGHT, ROW_HEIGHT } from "../_config/contants";
import { CapacityBoard } from "./_board";

@model("capacity-dimensions")
export class Dimensions extends Model({
    chartWidth: prop<number>(600).withSetter(),
}) {
    
    @computed
    get windowDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }


    @computed
    get Calendar() {
        return getRoot<CapacityBoard>(this).Calendar;
    }

    @computed
    get Pagination() {
        return getRoot<CapacityBoard>(this).Pagination;
    }

    @computed
    get xScale() {
        return scaleUtc({
            domain: [this.Calendar.tStart, this.Calendar.tEnd],
            range: [0, this.chartWidth],
        });
    }

    @computed
    get tScale() {
        return scaleLinear({
            range: [0, this.chartWidth],
            domain: [0, this.Calendar.t],
        });
    }

    @computed
    get maxHeight() {
        return window.innerHeight * 0.85;
    }

    @computed
    get height() {
        return this.Pagination.rows.length * ROW_HEIGHT + HEADER_HEIGHT;
    }
}

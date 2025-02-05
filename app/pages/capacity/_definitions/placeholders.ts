import { ViewMode } from "~/pages/capacity/_definitions/view-mode";
import { RowMode } from "~/pages/capacity/_definitions/row-mode";
import { Bound } from "~/pages/capacity/_definitions/bound";

type Any = { [index: string]: any };

export interface CapacityJson extends Any {
    id: string;
    rowId: string;
    stats: {
        softBookedDuration: number;
        hardBookedDuration: number;
        capacityDuration: number;
    };
    interval: {
        ts: number;
        tf: number;
    };
    viewMode: ViewMode;
    rowMode: RowMode;
}

export interface ResourceRowJson {
    id: string;
    name: string;
    color: string;
    hasBookings: boolean;
}

export interface ResourceTypeRowJson {
    id: string;
    name: string;
    typeNo: number;
    resources: string[];
}

export class CapacityBoardRows {
    resources: ResourceRowJson[];
    resourceTypes: ResourceTypeRowJson[];

    constructor(resources: [], resourceTypes: []) {
        this.resources = resources;
        this.resourceTypes = resourceTypes;
    }
}

export interface CapacityBoardRows extends Any {}

export interface BookingStageNode extends Any {}

export interface CapacityViewJson extends Any {}

interface Filter {
    rowMode: RowMode;
    viewMode: ViewMode;
    bounds: Bound[];
    rows: string[];
}

export class CapacityBatchFilter {
    rowMode: RowMode;
    viewMode: ViewMode;
    bounds: Bound[];
    rows: string[];

    constructor(props: Filter) {
        this.rowMode = props.rowMode;
        this.viewMode = props.viewMode;
        this.bounds = props.bounds;
        this.rows = props.rows;
    }
}

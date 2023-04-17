import { ViewMode } from "./viewmode";

export interface ICapacity {
    id: string;
    viewMode: ViewMode;
    rowId: string;
    stats: ICapacityStats;
    interval: ICapacityInterval;
}

export interface ICapacityStats {
    softBookedDuration: number;
    hardBookedDuration: number;
    capacityDuration: number;
}

export interface ICapacityInterval {
    ts: string;
    tf: string;
}

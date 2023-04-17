import { ViewMode } from "./viewmode";

export interface ICapacityBoardState {
    page: number;
    rowsPerPage: number;
    viewMode: ViewMode;
}

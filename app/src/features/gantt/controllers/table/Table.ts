import { GridColumnResizeParams } from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { Gantt } from "../Gantt";
import { ContextMenu } from "./ContextMenu";
import { TableCommands } from "./TableCommands";
import { TableHover } from "./TableHover";
import { TableSelection } from "./TableSelection";
import { Activity } from "gantt-models";
import { GanttColumn, IGanttColumns } from "../../types";

@model("gantt-table")
export class GanttTable extends Model({
    Commands: prop<TableCommands>(() => new TableCommands({})),
    Selection: prop<TableSelection>(() => new TableSelection({})),
    ContextMenu: prop<ContextMenu>(() => new ContextMenu({})),
    columnWidths: prop<IGanttColumns>(() => ({
        __tree_data_group__: 50,
        sequence: 0,
        dragHandle: 40,
        wbs: 50,
        identity: 175,
        period: 125,
        duration: 60,
        work: 90,
        team: 140,
        timeline: 500,
    })),
    Hover: prop<TableHover>(() => new TableHover({})),
    isMounted: prop<boolean>(false).withSetter(),
}) {
    api: React.MutableRefObject<GridApiPro> | undefined;

    @computed
    get ActivityStore() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @computed
    get AllotmentStore() {
        return getRoot<Gantt>(this).AllotmentStore;
    }

    @computed
    get Dimensions() {
        return getRoot<Gantt>(this).Dimensions;
    }

    @computed
    get Rows() {
        return [...this.ActivityStore.Rows, ...this.AllotmentStore.Assignments];
    }

    @modelAction
    updateApi(api: React.MutableRefObject<GridApiPro>) {
        this.api = api;
    }

    @modelAction
    updateColumnWidth = (col: GanttColumn, width: number) => {
        this.columnWidths[col] = width;
    };

    @modelAction
    handleColumnWidthChange = (params: GridColumnResizeParams) => {
        this.updateColumnWidth(
            params.colDef.field as GanttColumn,
            params.width
        );
        if (params.colDef.field === "timeline")
            this.Dimensions.setTimelineWidth(params.width);
    };

    @modelAction
    expandRow(Activity: Activity) {
        this.api?.current.setRowChildrenExpansion(Activity.id, true);
        Activity.setIsExpanded(true);
    }

    @modelAction
    collapseRow(Activity: Activity) {
        this.api?.current.setRowChildrenExpansion(Activity.id, false);
        Activity.setIsExpanded(false);
    }

    getRow(rowId: string) {
        return this.Rows.find((row) => row.id === rowId);
    }
}

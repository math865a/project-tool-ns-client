import { makeAutoObservable } from "mobx";
import { Gantt } from "./gantt";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import _ from "lodash";
import React from "react";
import { Activity } from "./activity";
import { GanttContextMenu } from "./table.context-menu";
import { GanttCommands } from "./table.commands";
import { GanttAssignmentMenu } from "./table.assignment-menu";
import { GridColumnResizeParams } from "@mui/x-data-grid-pro";

export class GanttTable {
    Gantt: Gantt;
    api: React.MutableRefObject<GridApiPro>;
    isMounted: boolean = false;
    AssignmentMenu: GanttAssignmentMenu;
    ContextMenu: GanttContextMenu;
    Commands: GanttCommands;
    constructor(Gantt: Gantt, api: React.MutableRefObject<GridApiPro>) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Gantt = Gantt;
        this.api = api;
        this.Commands = new GanttCommands(this);
        this.ContextMenu = new GanttContextMenu(this);
        this.AssignmentMenu = new GanttAssignmentMenu(this);
    }

    get Rows() {
        return [
            ...this.Gantt.Store.ActivityStore.Activities.filter(d => d.kind !== "Plan"),
            ...this.Gantt.Store.AssignmentStore.Assignments
        ]
    }

    set updateIsMounted(isMounted: boolean) {
        this.isMounted = isMounted;
    }


    handleColumnWidthChange = (params: GridColumnResizeParams) => {
        if (params.colDef.field === "timeline")
            this.Gantt.Dimensions.updateTimelineWidth = params.width;
    };

    expandRow(Activity: Activity) {
        this.api.current.setRowChildrenExpansion(Activity.id, true);
        Activity.Row.updateExpanded = true;
    }

    collapseRow(Activity: Activity) {
        this.api?.current.setRowChildrenExpansion(Activity.id, false);
        Activity.Row.updateExpanded = false;
    }

    getRow(rowId: string) {
        return this.Rows.find((row) => row.id === rowId);
    }

    refreshRows() {
        this.api.current.updateRows(this.Rows);
    }
}

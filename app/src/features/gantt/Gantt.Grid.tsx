import { DataGridPro } from "@mui/x-data-grid-pro";
import { HEADER_HEIGHT, ROW_HEIGHT } from "gantt/constants";
import { observer } from "mobx-react-lite";
import { Action, Subject } from "~/src/_definitions";
import { usePermissions } from "~/src/session-user";
import { TimelineDragProvider } from "./TimelineDragProvider";
import { useWorkpackage } from "useWorkpackage";
import { ActivityDndProvider } from "./columns/timeline/activity.cell/dnd";
import { ganttColumns, treeColumn } from "./columns";

export const GanttGrid = observer(() => {
    const { Gantt } = useWorkpackage();

    const Permissions = usePermissions();
    return (
        <ActivityDndProvider>
            <TimelineDragProvider>
                <DataGridPro
                    apiRef={Gantt.Table.api}
                    columns={ganttColumns}
                    rows={Gantt.Table.Rows}
                    getTreeDataPath={(row) => row.path}
                    groupingColDef={treeColumn}
                    rowThreshold={0}
                    isGroupExpandedByDefault={(row) => {
                        const Row = Gantt.Table.getRow(row.id as string);
                        if (!Row || Row.kind === "Assignment") return false;
                        return Row.Row.isExpanded;
                    }}
                    onColumnWidthChange={Gantt.Table.handleColumnWidthChange}
                    componentsProps={{
                        row: {
                            onContextMenu: Permissions.can(
                                Action.Write,
                                Subject.Workpackages
                            )
                                ? Gantt.Table.ContextMenu.handleContextMenu
                                : undefined,
                        },
                    }}
                    pinnedColumns={{ right: ["timeline"] }}
                    sortModel={[{ field: "sequence", sort: "asc" }]}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "sequence", sort: "asc" }],
                        },
                    }}
                    columnVisibilityModel={{
                        sequence: false,
                    }}
                    hideFooter
                    disableColumnFilter
                    disableColumnMenu
                    treeData
                    rowHeight={ROW_HEIGHT}
                    columnHeaderHeight={HEADER_HEIGHT}
                    sx={{
                        border: "none",
                        "& .MuiDataGrid-cell": {
                            padding: "0px 8px",
                            outline: "none",
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                            "&:hover": {
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            },
                            "& .Mui-selected": {
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            },
                            "&:focus-within": {
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                                outline: "none",
                            },
                        },
                        "& .MuiDataGrid-columnHeader": {
                            padding: "0px 0px",
                            borderTop: "none",
                            fontSize: "12px",
                            "&:hover": {
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            },
                            "& .Mui-selected": {
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            },
                            "&:focus-within": {
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                                outline: "none",
                            },
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderTop: "none",
                        },
                        "& .Mui-selected": {
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                            border: "none",
                        },
                        "& .MuiDataGrid-row": {
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                            outline: "none",
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-pinnedColumnHeaders": {
                            boxShadow: "none",
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                        },
                        "& .MuiDataGrid-pinnedColumns": {
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                        },
                        "& .MuiDataGrid-detailPanel": {
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                        },
                    }}
                />
            </TimelineDragProvider>
        </ActivityDndProvider>
    );
});

import { DataGridPro } from "@mui/x-data-grid-pro";
import { HEADER_HEIGHT, ROW_HEIGHT } from "gantt/constants";
import { observer } from "mobx-react-lite";
import { Action, Subject } from "~/src/_definitions";
import { usePermissions } from "~/src/session-user";
import { TimelineDragProvider } from "./TimelineDragProvider";
import { useWorkpackage } from "useWorkpackage";
import { ActivityDndProvider } from "./columns/timeline/activity.cell/dnd";
import { ganttColumns, treeColumn } from "./columns";
import { GanttToolbar } from "./toolbar";
import { ClientOnly } from "remix-utils";

export const GanttGrid = observer(
    ({ showToolbar }: { showToolbar?: boolean }) => {
        const { Gantt } = useWorkpackage();

        const Permissions = usePermissions();
        return (
            <ClientOnly>{() => (
            <ActivityDndProvider>
                <TimelineDragProvider>
                    <DataGridPro
                        apiRef={Gantt.Table.api}
                        columns={ganttColumns}
                        rows={Gantt.Table.Rows}
                        getTreeDataPath={(row) => row.Row.path}
                        groupingColDef={treeColumn}
                        rowThreshold={0}
                        isGroupExpandedByDefault={(row) => {
                            const Row = Gantt.Table.getRow(row.id as string);
                            if (!Row || Row.kind === "Assignment") return false;
                            return Row.Row.isExpanded;
                        }}
                        slots={{
                            toolbar: showToolbar ? GanttToolbar : undefined,
                        }}
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
                                padding: "0px 0px",
                                outline: "none",
                                backgroundColor: "#fff",
                                "&:hover": {
                                    backgroundColor: "#fff",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#fff",
                                },
                                "&:focus-within": {
                                    backgroundColor: "#fff",
                                    outline: "none",
                                },
                            },
                            "& .MuiDataGrid-columnHeader": {
                                padding: "0px 0px",
                                borderTop: "none",
                                fontSize: "12px",
                                overflow: "hidden",
                                position: "relative",
                                "&:hover": {
                                    backgroundColor: "#fff",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#fff",
                                },
                                "&:focus-within": {
                                    backgroundColor: "#fff",
                                    outline: "none",
                                },
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                borderTop: "none",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#fff",
                                border: "none",
                            },
                            "& .MuiDataGrid-row": {
                                backgroundColor: "#fff",
                                outline: "none",
                                borderTop: "none",
                            },
                            "& .MuiDataGrid-pinnedColumnHeaders": {
                                boxShadow: "none",
                                backgroundColor: "#fff",
                            },
                            "& .MuiDataGrid-pinnedColumns": {
                                backgroundColor: "#fff",
                            },
                            "& .MuiDataGrid-detailPanel": {
                                backgroundColor: "#fff",
                            },
                        }}
                    />
                </TimelineDragProvider>
            </ActivityDndProvider>)}</ClientOnly>
        );
    }
);

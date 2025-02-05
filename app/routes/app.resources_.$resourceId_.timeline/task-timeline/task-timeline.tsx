import { disableInteraction } from "~/styles";
import { Box } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { Grid, Page } from "design";
import { observer } from "mobx-react-lite";
import TimelineControls from "./components/controls";
import { useTimelineDrag } from "./components/drag";
import HeaderCalendar from "./components/header-calendar";
import WorkpackageRow from "./components/workpackage-row";
import {
    BAR_HEIGHT,
    HEADER_HEIGHT,
    ROW_PADDING,
} from "./controllers/_constants";
import { TimelineWorkpackage } from "./models/workpackage.model";
import { useTimeline } from "./task-timeline.provider";
import { IconChartInfographic } from "@tabler/icons-react";

const TaskTimelineGrid = observer(() => {
    const Controller = useTimeline();
    const drag = useTimelineDrag();

    return (
        <Page.Section
            titleIcon={IconChartInfographic}
            titleSize={16}
            height="85vh"
            titleIconSize={1.5}
            title="Tidslinje"
            xs={12}
            minHeight="85vh"
            startActions={
                Controller.Store.Workpackages.length === 0 ? undefined : (
                    <TimelineControls />
                )
            }
        >
            {Controller.Store.Workpackages.length === 0 ? (
                <Grid.NoRowsOverlay />
            ) : (
                <Box
                    width="100%"
                    height="80vh"
                    onMouseDown={drag.dragStart}
                    onMouseMove={drag.dragMove}
                    onMouseUp={drag.dragEnd}
                    sx={{
                        cursor: Controller.Calendar.isDragging
                            ? "grabbing"
                            : "grab",
                    }}
                >
                    <DataGridPro
                        columns={columns}
                        rows={Controller.Store.Workpackages}
                        columnHeaderHeight={HEADER_HEIGHT}
                        hideFooter
                        components={{
                            NoRowsOverlay: Grid.NoRowsOverlay,
                        }}
                        getRowHeight={(row) => {
                            const Model = Controller.Store.Workpackages.find(
                                (d) => d.id === row.id
                            );
                            return Model
                                ? Model.h
                                : BAR_HEIGHT + 2 * ROW_PADDING;
                        }}
                        onColumnWidthChange={(params) => {
                            if (params.colDef.field === "timeline") {
                                Controller.Dimensions.setChartWidth(
                                    params.colDef.computedWidth
                                );
                            }
                        }}
                        sx={{
                            border: "none",
                            "& .MuiDataGrid-cell": {
                                padding: "0px 0px",
                                outline: "none",

                                backgroundColor: "transparent",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "transparent",
                                },
                                "&:focus-within": {
                                    backgroundColor: "transparent",
                                    outline: "none",
                                },
                            },
                            "& .MuiDataGrid-columnHeader": {
                                padding: "0px 0px",
                                ...disableInteraction,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "transparent",
                                },
                                "&:focus-within": {
                                    backgroundColor: "transparent",
                                    outline: "none",
                                },
                            },
                            "& .Mui-selected": {
                                backgroundColor: "transparent",
                                border: "none",
                            },
                            "& .MuiDataGrid-row": {
                                backgroundColor: "transparent",
                                outline: "none",
                                borderBottom: (theme) =>
                                    "1px solid " + theme.palette.divider,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                },
                            },
                        }}
                    />
                </Box>
            )}
        </Page.Section>
    );
});

export default TaskTimelineGrid;

const columns: GridColDef<TimelineWorkpackage>[] = [
    {
        field: "timeline",
        flex: 1,
        renderCell: (props) => <WorkpackageRow Workpackage={props.row} />,
        renderHeader: (props) => <HeaderCalendar />,
    },
];

import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useCapacityCharts } from "../_state";
import { taskGridColumns } from "./config/columns";
import { HEADER_HEIGHT, ROW_HEIGHT } from "./config/constants";
import { sxGrid } from "./config/sxGrid";
import { useScale } from "./provider/TimelineProvider";

export default function TasksGrid() {

    const {workpackageTasks: {data}} = useCapacityCharts()
    const { updateTimelineWidth } = useScale();

    return (
        <Box width="100%" height={400}>
            <DataGridPro
                columns={taskGridColumns}
                rows={data}
                hideFooter
                columnHeaderHeight={HEADER_HEIGHT}
                rowHeight={ROW_HEIGHT}
                onColumnWidthChange={(params, event, details) => {
                    if (params.colDef.field === "timeline") {
                        updateTimelineWidth(params.width);
                    }
                }}
                sx={sxGrid}
            />
        </Box>
    );
}

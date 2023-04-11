import { Box } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { ROW_HEIGHT } from "../config/constants";
import { IWorkpackageTask } from "../../_state/useWorkpackageTasks";
import { useScale } from "../provider/TimelineProvider";
import TaskBar from "./TaskBar";

export default function TimelineRow(
    props: GridRenderCellParams<IWorkpackageTask>
) {
    const { timelineWidth } = useScale();
    return (
        <Box width={timelineWidth} height={ROW_HEIGHT} position="relative">
            <TaskBar task={props.row}/>
        </Box>
    );
}

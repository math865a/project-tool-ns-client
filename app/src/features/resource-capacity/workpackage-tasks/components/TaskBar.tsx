import { Box, Paper } from "@mui/material";
import { BAR_HEIGHT, BAR_OFFSET } from "../config/constants";
import { useTaskBar } from "../hooks/useTaskBar";
import { IWorkpackageTask } from "../../_state/useWorkpackageTasks";

export default function TaskBar({ task }: { task: IWorkpackageTask }) {
    const { x1, w } = useTaskBar(task.interval);

    return (
        <Box
            position="absolute"
            left={x1}
            top={BAR_OFFSET}
            width={w}
            height={BAR_HEIGHT}
            component={Paper}
            sx={{ backgroundColor: task.color, borderRadius: 1 }}
            variant="outlined"
        />
    );
}

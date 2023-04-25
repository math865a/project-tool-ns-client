import { useElementSize } from "@mantine/hooks";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWorkpackage } from "useWorkpackage";
import { GanttContent } from "../Gantt.Content";

export const GanttPage = observer(() => {
    const { Gantt } = useWorkpackage();
    const { ref, width, height } = useElementSize();

    useEffect(() => {
        if (
            width !== Gantt.Dimensions.width ||
            height !== Gantt.Dimensions.height
        ) {
            Gantt.Dimensions.update(width, height);
        }
    }, [width, height]);

    return (
        <Box flexGrow={1} height={"80vh"} maxHeight={"80vh"} ref={ref} mt={3} position="relative">
            <GanttContent />
        </Box>
    );
});

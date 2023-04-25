import { useElementSize } from "@mantine/hooks";
import { DialogContent } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWorkpackage } from "useWorkpackage";


export const GanttContent = observer(() => {
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
        <DialogContent
            ref={ref}
            sx={{ overflowY: "hidden", position: "relative", pb: 0 }}
        >
            <GanttContent/>
        </DialogContent>
    );
});

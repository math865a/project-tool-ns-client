import { useElementSize } from "@mantine/hooks";
import { DialogContent } from "@mui/material";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWorkpackage } from "useWorkpackage";
import {GanttGrid} from "./Gantt.Grid";
import  { GanttAssignmentMenu } from "./assignment-menu/AssignmentMenu";

import {GanttNoRows} from "./Gantt.NoRows";
import { GanttContextMenu } from "./context-menu";

export const GanttContent = observer(() => {
    const { Gantt } = useWorkpackage();

    const content = computed(() => {
        if (Gantt.ActivityStore.Activities.length === 1) {
            return <GanttNoRows />;
        } else {
            return <GanttGrid />;
        }
    });

    const { ref, width, height } = useElementSize();

    useEffect(() => {
        if (
            width !== Gantt.Dimensions.dialogDimensions.width ||
            height !== Gantt.Dimensions.dialogDimensions.height
        ) {
            Gantt.Dimensions.updateDialogDimensions(width, height);
        }
    }, [width, height]);

    return (
        <DialogContent
            ref={ref}
            sx={{ overflowY: "hidden", position: "relative", pb: 0 }}
        >
            {content.get()}
            <GanttContextMenu />
            <GanttAssignmentMenu />
        </DialogContent>
    );
});

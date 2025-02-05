import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { Activity } from "gantt-models";
import { IconDragDrop } from "@tabler/icons-react";

export const ActivityDragHandleCell = observer(
    ({ Activity }: { Activity: Activity }) => {
        //const { setActivatorNodeRef, handleProps } = useHandleContext();

        return (
            <Box
                maxWidth={30}
                flexGrow={1}
                display="flex"
                justifyContent="center"
            >
                {Activity.isHovering && (
                    <Action.Symbol
                        icon={IconDragDrop}
                        // ref={setActivatorNodeRef}
                        //{...handleProps}
                    />
                )}
            </Box>
        );
    }
);

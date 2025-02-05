import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { Allocation } from "gantt-models";
import { IconExclamationMark } from "@tabler/icons-react";

export const DailyWorkWarning = observer(
    ({
        Allocation,
        isDragging,
    }: {
        Allocation: Allocation;
        isDragging: boolean;
    }) => {
        if (Allocation.dailyWork > 8 && !isDragging) {
            return (
                <Box
                    position="absolute"
                    left={-25}
                    top={0}
                    bottom={0}
                    zIndex={600}
                    display="flex"
                    alignItems="center"
                >
                    <Action.Symbol
                        icon={IconExclamationMark}
                        iconSize={1.2}
                        sx={{ color: "#E91B0C" }}
                        title="Denne allokering har mere end 8 timer pr. dag."
                    />
                </Box>
            );
        }
        return null;
    }
);

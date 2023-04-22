import { faExclamation } from "@fortawesome/pro-solid-svg-icons";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { Allocation } from "gantt-models";

export const DailyWorkWarning = observer(
    ({
        Allocation,
        isDragging,
    }: {
        Allocation: Allocation;
        isDragging: boolean;
    }) => {
        if (Allocation.Timesheet.stats.dailyWork > 8 && !isDragging) {
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
                        icon={faExclamation}
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

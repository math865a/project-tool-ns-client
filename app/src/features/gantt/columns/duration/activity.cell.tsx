import { Box, Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";

export const ActivityDurationCell = observer((props: GridRenderCellParams<Activity>) => {
    return (
        <Box flexGrow={1}>
            <Typography
                textAlign="center"
                fontSize={12}
                sx={{ color: props.row.Style.textColor }}
            >
                {props.row.Interval.display.counts.medium.workDays}
            </Typography>
        </Box>
    );
});

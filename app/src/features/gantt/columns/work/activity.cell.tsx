import { Box, Stack, Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";

export const ActivityWorkCell = observer((props: GridRenderCellParams<Activity>) => {
    return (
        <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography fontSize={12} sx={{color: props.row.Style.textColor}}>
                    {props.row.Work.display.total}
                </Typography>
            </Stack>
        </Box>
    );
});

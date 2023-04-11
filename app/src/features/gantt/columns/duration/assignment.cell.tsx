import { Box, Typography } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { observer } from 'mobx-react-lite';
import { Assignment } from "gantt-models";

export const AssignmentDurationCell = observer((props: GridRenderCellParams<Assignment>) => {
    return (
        <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
       
        >
                <Typography fontSize={12} color="text.secondary">
                    {props.row.workDayCount + " dage"}
                </Typography>
        </Box>
    );
});

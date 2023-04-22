import { Box, Stack, Typography } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Assignment } from "gantt-models";
import { observer } from 'mobx-react-lite';

export const AssignmentWorkCell = observer((props: GridRenderCellParams<Assignment>) => {
    return (
        <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
       
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography fontSize={12} color="text.secondary">
                    {/*props.row.workHours.total*/}
                </Typography>
            </Stack>
        </Box>
    );
});


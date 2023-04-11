import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Activity } from "gantt-models";

export const ActivityWBSCell = observer(({ Activity }: { Activity: Activity }) => {
    return (
        <Box flexGrow={1}>
            <Typography
           sx={{color:Activity.textColor}}
                fontSize={12}
                textAlign="center"
                //fontWeight={Activity.Style.fontWeight}
            >
                {Activity.wbs}
            </Typography>
        </Box>
    );
});



import { faMapPin } from '@fortawesome/pro-light-svg-icons';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useParams } from '@remix-run/react';
import { Symbol } from 'design';
import { observer } from 'mobx-react-lite';
import invariant from 'tiny-invariant';
import { useWorkpackage } from 'useWorkpackage';

export const GanttNoRows = observer(() => {
    const { Gantt } = useWorkpackage()
    const {workpackageId} = useParams()
    invariant(workpackageId)

    const handleCreateDelivery = () => {
        Gantt.ActivityStore.createDelivery(0)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: 400,
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                flexGrow={1}
                minHeight={400}
            >
                <Stack spacing={5}>
                    <Stack
                        spacing={2}
                        alignItems="center"
                        flexGrow={1}
                        justifyContent="center"
                    >
                        <Typography  fontSize={18}>
                            Der er ikke oprettet nogle leverancer endnu.
                        </Typography>
                    </Stack>
                    <Box display="flex" flexGrow={1} justifyContent="center">
                        <Button startIcon={<Symbol icon={faMapPin} size={0.9}/>} onClick={handleCreateDelivery} color="primary" variant="outlined">
                            Opret en leverance
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </div>
    );
});

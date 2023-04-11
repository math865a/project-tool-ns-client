import { disableInteraction } from  "~/styles";
import { Box, Paper, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { BAR_HEIGHT } from '../controllers/_constants';
import { TimelineTask } from '../models/task.model';

const TaskBar = observer(({ Task }: { Task: TimelineTask }) => {
    return (
        <Box
            component={Paper}
            position="absolute"
            top={Task.Bar.y}
            left={Task.Bar.x1}
            overflow="hidden"
    
            onMouseOver={() => Task.setIsHovering(true)}
            onMouseLeave={() => Task.setIsHovering(false)}
            width={Task.Bar.w}
            height={BAR_HEIGHT}
            sx={{
                backgroundColor: '#fff',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                '&:hover': {
                    backgroundColor: (theme) => theme.palette.background.paper,
                    cursor: 'pointer',
                },
            }}
            p={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Box height="50%" flexGrow={1} sx={disableInteraction}>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                    <Box
                        height={9}
                        width={9}
                        minWidth={9}
                        minHeight={9}
                        maxHeight={9}
                        maxWidth={9}
                        borderRadius="50%"
                        sx={{
                            backgroundColor: Task.color,
                        }}
                    />
                    <Typography
                        fontWeight="bold"
                        color="text.secondary"
                        fontSize={12}
                        noWrap
                        textOverflow="ellipsis"
                        maxWidth={Task.Bar.w}
                    >
                        {Task.taskName}
                    </Typography>
                </Stack>
            </Box>

            <Box
                flexGrow={1}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                color="text.secondary"
                height="50%"
                sx={disableInteraction}
            >
                <Typography fontSize={11}>{Task.Work.workDisplay}</Typography>
            </Box>
        </Box>
    );
});

export default TaskBar;

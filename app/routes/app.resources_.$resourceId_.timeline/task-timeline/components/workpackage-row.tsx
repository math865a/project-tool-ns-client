import {
    faBriefcase,
    faBusinessTime,
    faUserTie,
} from '@fortawesome/pro-light-svg-icons';
import { Symbol } from 'design';
import { disableInteraction } from  "~/styles";
import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { ROW_PADDING } from '../controllers/_constants';
import { TimelineWorkpackage } from '../models/workpackage.model';
import { useTimeline } from '../task-timeline.provider';
import TaskBar from './task-bar';

const WorkpackageRow = observer(
    ({ Workpackage }: { Workpackage: TimelineWorkpackage }) => {
        return (
            <Box flexGrow={1} height={Workpackage.h} position="relative">
                <Today Workpackage={Workpackage} />

                <Box
                    flexGrow={1}
                    height={Workpackage.h - ROW_PADDING * 1.5}
                    position="relative"
                    zIndex={500}
                >
                    <RenderTasks Workpackage={Workpackage} />
                </Box>
                <Box
                    flexGrow={1}
                    height={ROW_PADDING * 1.5}
                    display="flex"
                    alignItems="center"
                    px={3}
                    zIndex={500}
                >
                    <WorkpackageDetails Workpackage={Workpackage} />
                </Box>
            </Box>
        );
    }
);

export default WorkpackageRow;

const RenderTasks = observer(
    ({ Workpackage }: { Workpackage: TimelineWorkpackage }) => {
        return (
            <>
                {Workpackage.Tasks.map((Task) => (
                    <TaskBar Task={Task} key={Task.id} />
                ))}
            </>
        );
    }
);

const WorkpackageDetails = observer(
    ({ Workpackage }: { Workpackage: TimelineWorkpackage }) => {
        const Timeline = useTimeline();

        const commonStyles: React.CSSProperties = useMemo(() => {
            if (Timeline.Calendar.isDragging)
                return disableInteraction as React.CSSProperties;
            return {};
        }, [Timeline.Calendar.isDragging]);

        return (
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ zIndex: 500 }}
                style={commonStyles}
            >
                <Stack spacing={0.75} alignItems="center" direction="row">
                    <Tooltip title="Arbejdspakke">
                        <Box>
                            <Symbol icon={faBriefcase} />
                        </Box>
                    </Tooltip>

                    <Typography
                        fontSize={12}
                        component={Link}
                        to={`/app/workpackages/${Workpackage.id}`}
                        color="inherit"
                        sx={{
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {Workpackage.systematicName}
                    </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack spacing={0.75} alignItems="center" direction="row">
                    <Tooltip title="Projektleder">
                        <Box>
                            <Symbol icon={faUserTie} />
                        </Box>
                    </Tooltip>
                    <Typography
                        fontSize={12}
                        component={Link}
                        to={`/app/resources/${Workpackage.projectManager.id}`}
                        color="inherit"
                        sx={{
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {Workpackage.projectManager.name}
                    </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Tooltip title="Bookingtype">
                    <Stack spacing={0.75} alignItems="center" direction="row">
                        <Box
                            height={12.5}
                            width={12.5}
                            borderRadius="50%"
                            sx={{
                                backgroundColor: Workpackage.bookingStage.color,
                            }}
                        />

                        <Typography fontSize={12} sx={disableInteraction}>
                            {Workpackage.bookingStage.name}
                        </Typography>
                    </Stack>
                </Tooltip>
                <Divider orientation="vertical" flexItem />
                <Tooltip title="Stadie">
                    <Stack spacing={0.75} alignItems="center" direction="row">
                        <Box
                            height={12.5}
                            width={12.5}
                            borderRadius="50%"
                            sx={{ backgroundColor: Workpackage.stage.color }}
                        />

                        <Typography fontSize={12} sx={disableInteraction}>
                            {Workpackage.stage.name}
                        </Typography>
                    </Stack>
                </Tooltip>
                <Divider orientation="vertical" flexItem />
                <Tooltip title="Arbejdstimer">
                    <Stack spacing={0.75} alignItems="center" direction="row">
                        <Symbol icon={faBusinessTime} />

                        <Typography fontSize={12} sx={disableInteraction}>
                            {Workpackage.displayWork}
                        </Typography>
                    </Stack>
                </Tooltip>
            </Stack>
        );
    }
);

const Today = observer(
    ({ Workpackage }: { Workpackage: TimelineWorkpackage }) => {
        const Calendar = useTimeline().Calendar;
        if (Calendar.xToday < 0) return null;
        return (
            <Box
                width={Calendar.xToday}
                height={Workpackage.h}
                zIndex={1}
                sx={{
                    ...disableInteraction,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: (theme) => theme.palette.divider,
                    opacity: 0.15,
                    borderRight: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                }}
            />
        );
    }
);

/*        <svg width={Calendar.xToday} height={Workpackage.h} style={{position: "absolute", top: 0, left: 0, zIndex: 10}}>
            <rect
                width={Calendar.xToday}
                x={0}
                y={0}
                height={Workpackage.h}
                fill="#CECECE"
            />
        </svg>
        </Box>*/

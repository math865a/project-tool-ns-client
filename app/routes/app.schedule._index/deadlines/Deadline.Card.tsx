import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Paper,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { IDeadlineTask } from "../_state/useDeadlines";
import { useMemo } from "react";
import { Avatars, Symbol } from "~/src/design-system";
import _ from "lodash";
import { formatDecimal } from "~/util/format";
import { faClock, faTimer } from "@fortawesome/pro-light-svg-icons";
import { useElementSize } from "@mantine/hooks";
import { useSession } from "~/src";
import { useSummary } from "../_state";

export function DeadlineCard({
    title,
    workpackage,
    due,
    team,
    display,
    interval,
    work,
    dailyWork,
    projectManager,
    workDays,
}: IDeadlineTask) {
    const theme = useTheme();
    const dueDisplay = useMemo(() => {
        if (due > 5) {
            return {
                title: "Om " + due + " dage",
                color: theme.palette.success.main,
            };
        } else if (due > 0) {
            return {
                title: "Om " + due + " dage",
                color: "#F5D491",
            };
        } else if (due < 0) {
            return {
                title: "For " + Math.abs(due) + " dage siden",
                color: theme.palette.error.main,
            };
        }
        return {
            title: "I dag",
            color: "info",
        };
    }, [due]);

    const { workpackages } = useSummary();

    const color = useMemo(() => {
        const wp = workpackages.find((wp) => wp.id === workpackage.id);
        return wp?.color;
    }, [workpackages, workpackage.id]);

    const { ref, width } = useElementSize();

    const { user } = useSession();

    return (
        <Card
            sx={{
                width: "100%",
                height: 125,
                borderRadius: 4,
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
            }}
            variant="outlined"
        >
            <CardHeader
                disableTypography
                title={
                    <Tooltip
                        title={
                            <Box p={1} maxWidth={200}>
                                <Typography
                                    fontWeight="bold"
                                    fontSize={12}
                                    gutterBottom
                                >
                                    Arbejdspakke
                                </Typography>
                                <Typography fontSize={12}>
                                    {workpackage.name}
                                </Typography>
                            </Box>
                        }
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            pb={0.33}
                        >
                            {color && (
                                <Box
                                    width={10}
                                    height={10}
                                    borderRadius={0.75}
                                    sx={{
                                        backgroundColor: color,
                                    }}
                                />
                            )}
                            <Typography fontSize={13}>
                                {workpackage.systematicName}
                            </Typography>
                        </Stack>
                    </Tooltip>
                }
                subheader={
                    <Tooltip
                        title={
                            <Box p={1} maxWidth={200}>
                                <Typography
                                    fontWeight="bold"
                                    fontSize={12}
                                    gutterBottom
                                >
                                    Opgave
                                </Typography>
                                <Typography fontSize={12}>{title}</Typography>
                            </Box>
                        }
                    >
                        <Typography
                            color="text.secondary"
                            ref={ref}
                            noWrap
                            overflow="hidden"
                            textOverflow="ellipsis"
                            fontSize={12}
                            maxWidth={225}
                        >
                            {title}
                        </Typography>
                    </Tooltip>
                }
                action={
                    <Tooltip
                        title={
                            <Box p={1}>
                                <Typography
                                    fontWeight="bold"
                                    fontSize={12}
                                    gutterBottom
                                >
                                    Arbejde
                                </Typography>
                                <Typography fontSize={12} gutterBottom>
                                    {formatDecimal(work) + " timer i alt"}
                                </Typography>
                                <Typography fontSize={12}>
                                    {formatDecimal(dailyWork) +
                                        " timer dagligt (" +
                                        workDays +
                                        (workDays === 1 ? " dag)" : " dage)")}
                                </Typography>
                            </Box>
                        }
                    >
                        <Stack
                            direction="row"
                            spacing={0.75}
                            alignItems="center"
                            pr={1}
                            maxWidth={50}
                        >
                            <Symbol icon={faClock} />
                            <Typography
                                fontSize={12}
                                pt={0.25}
                                color="text.secondary"
                            >
                                {formatDecimal(work) + "t"}
                            </Typography>
                        </Stack>
                    </Tooltip>
                }
            />

            <CardActions>
                <Box
                    display="flex"
                    flexGrow={1}
                    justifyContent="space-between"
                    pl={1}
                >
                    <Tooltip
                        arrow
                        placement="bottom"
                        title={
                            <Box p={1}>
                                <Typography fontSize={12} gutterBottom>
                                    {`${_.capitalize(
                                        interval.start
                                            ?.setLocale("da")
                                            .toFormat("cccc dd/MM/yyyy") ?? ""
                                    )} til ${interval.end
                                        ?.setLocale("da")
                                        .toFormat("cccc dd/MM/yyyy")}`}
                                </Typography>
                                <Typography fontSize={12}>
                                    {display.workDays}
                                </Typography>
                            </Box>
                        }
                    >
                        <Chip
                            sx={{
                                fontSize: 11,
                                backgroundColor: dueDisplay.color + "60",
                                borderRadius: 1,
                                color: "#000",
                            }}
                            size="small"
                            label={dueDisplay.title}
                        />
                    </Tooltip>
                </Box>
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatars.Individual
                            subject={projectManager}
                            size={22.5}
                            fontSize={11}
                            tooltip={projectManager.name + " (projektleder)"}
                        />
                        <Divider orientation="vertical" flexItem />
                        <Avatars.EllipsisGroup
                            People={team}
                            size={22.5}
                            fontSize={11}
                            getTooltip={(p) =>
                                p.name +
                                (user.uid === p.id ? " (mig)" : " (teammedlem)")
                            }
                        />
                    </Stack>
                </Box>
            </CardActions>
        </Card>
    );
}

import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Divider,
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
                title={title}
                subheader={workpackage.systematicName}
                subheaderTypographyProps={{ fontSize: 12 }}
                titleTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    maxWidth: 175,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                action={
                    <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        pr={1}
                        pt={1}
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
                                <Typography fontWeight="bold" fontSize={12}>
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
                        />
                        <Divider orientation="vertical" flexItem />
                        <Avatars.EllipsisGroup
                            People={team}
                            size={22.5}
                            fontSize={11}
                        />
                    </Stack>
                </Box>
            </CardActions>
        </Card>
    );
}

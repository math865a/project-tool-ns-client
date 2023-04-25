import { Box, Paper, Stack, Typography } from "@mui/material";
import { Allocation } from "gantt-models";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { disableInteraction } from "~/styles";
import { formatDecimal } from "~/util";

const BarContent = observer(
    (props: { Allocation: Allocation; width: number }) => {
        const { Allocation, width } = props;

        return (
            <Box
                component={Paper}
                display="flex"
                flexGrow={1}
                height={Allocation.Bar.iRect.h}
                maxWidth={width}
                justifyContent="space-between"
                alignItems="center"
                py={0.25}
                px={1}
                variant="outlined"
                sx={{
                    borderRadius: 1,
                    color: Allocation.fill.color,
                    height: Allocation.Bar.iRect.h,
                    width: Allocation.Bar.rect.w,
                    textDecoration: "none",
                    backgroundColor:
                        Allocation.Assignment?.TeamMember?.Resource.color,
                }}
                style={disableInteraction}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    flexShrink={1}
                    sx={{ overflow: "hidden" }}
                >
                    {width > 50 && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.2}
                        >
                            <Typography
                                fontSize={12}
                                sx={{ fontVariant: "tabular-nums" }}
                                letterSpacing={0.3}
                            >
                                {Allocation.Timesheet.stats.timesheet.total}
                            </Typography>
                            <Typography
                                fontSize={9}
                                sx={{
                                    fontVariant: "tabular-nums",
                                }}
                            >
                                {width > 100 ? "timer" : "t"}
                            </Typography>
                        </Stack>
                    )}
                    {width > 75 && (
                        <>
                            <Typography fontWeight={200} fontSize={12}>
                                /
                            </Typography>

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.2}
                            >
                                <Typography
                                    fontSize={12}
                                    sx={{ fontVariant: "tabular-nums" }}
                                    letterSpacing={0.3}
                                >
                                    {Allocation.Interval.counts.workDays}
                                </Typography>
                                <Typography
                                    fontSize={9}
                                    sx={{
                                        fontVariant: "tabular-nums",
                                    }}
                                >
                                    {width > 100 ? "dage" : "d"}
                                </Typography>
                            </Stack>
                        </>
                    )}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    {width > 125 && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.2}
                        >
                            <Typography
                                fontSize={12}
                                sx={{ fontVariant: "tabular-nums" }}
                                letterSpacing={0.3}
                            >
                                {Allocation.Timesheet.stats.dailyWork === 0
                                    ? "-"
                                    : formatDecimal(
                                          _.round(Allocation.Timesheet.stats.dailyWork, 1)
                                      )}
                            </Typography>
                            <Typography
                                fontSize={9}
                                sx={{
                                    fontVariant: "tabular-nums",
                                }}
                            >
                                {width > 100 ? "t/dag" : "t/d"}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Box>
        );
    }
);

export default BarContent;

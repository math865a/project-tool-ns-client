import { Box, Paper, Stack, Typography } from "@mui/material";
import { Allocation } from "gantt-models";
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
                height={Allocation.Bar.h}
                maxWidth={width}
                justifyContent="space-between"
                alignItems="center"
                py={0.25}
                px={1}
                variant="outlined"
                sx={{
                    borderRadius: 1,
                    color: Allocation.fill.color,
                    height: Allocation.Bar.h,
                    width: Allocation.Bar.coord.w,
                    textDecoration: "none",
                    backgroundColor:
                        Allocation.Assignment?.TeamMember?.resource.color,
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
                            spacing={0.5}
                        >
                            <Typography
                                fontSize={13}
                                sx={{ fontVariant: "tabular-nums" }}
                                letterSpacing={0.3}
                            >
                                {Allocation.totalHours}
                            </Typography>
                            <Typography
                                fontSize={11}
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
                                spacing={0.5}
                            >
                                <Typography
                                    fontSize={13}
                                    sx={{ fontVariant: "tabular-nums" }}
                                    letterSpacing={0.3}
                                >
                                    {Allocation.Interval.workdayCount}
                                </Typography>
                                <Typography
                                    fontSize={11}
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
                            spacing={0.5}
                        >
                            <Typography
                                fontSize={13}
                                sx={{ fontVariant: "tabular-nums" }}
                                letterSpacing={0.3}
                            >
                                {Allocation.dailyWork === 0
                                    ? "-"
                                    : formatDecimal(Allocation.dailyWork)}
                            </Typography>
                            <Typography
                                fontSize={11}
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

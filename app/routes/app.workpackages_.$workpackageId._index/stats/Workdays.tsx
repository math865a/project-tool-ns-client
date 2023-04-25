import { observer } from "mobx-react-lite";
import { useWorkpackage } from "~/src/state";
import { scaleUtc } from "@visx/scale";
import { computed } from "mobx";
import { Box, Paper, Typography } from "@mui/material";
import { useElementSize, useHover, useMergedRef } from "@mantine/hooks";
import { DateTime } from "luxon";

export const Workdays = observer(() => {
    const {
        Gantt: {
            Store: {
                ActivityStore: { Plan },
            },
        },
    } = useWorkpackage();

    const { ref: sizeRef, width } = useElementSize();

    const scale = computed(() => {
        return scaleUtc({
            domain: [Plan?.Interval.t.s ?? 0, Plan?.Interval.t.f ?? 0],
            range: [0, width],
        });
    });

    const indicatorWidth = computed(() => {
        const now = DateTime.now().toMillis();
        return scale.get()(now);
    });

    const hoverText = computed(() => {
        if (!Plan) return "";
        if (Plan.Interval.isFinished)
            return Plan.Interval.display.counts.long.workDays;
        return (
            Plan.Interval.counts.workDaysRemaining + " dage tilbage (" + Plan.Interval.display.percentages.workDaysLeft + ")"
        );
    });

    const displayText = computed(() => {
        if (!Plan) return "";
        if (Plan.Interval.isFinished) {
            return (
                "Færdig for " +
                Math.abs(
                    Math.round(
                        Plan.Interval.dt.end.diffNow().shiftTo("days").days
                    )
                ) +
                " dage siden"
            );
        }
        return (
            Plan.Interval.counts.workDaysComplete +
            " / " +
            Plan.Interval.counts.workDays +
            " dage (" + Plan.Interval.display.percentages.workDaysComplete + ")"
        );
    });

    const { ref: hoverRef, hovered } = useHover();

    const ref = useMergedRef(hoverRef, sizeRef);

    return (
        <Box
            flexGrow={1}
            ref={ref}
            height={27.5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
            position="relative"
            overflow="hidden"
            component={Paper}
            variant="outlined"
            mt={1}
            maxWidth={200}
            boxSizing="content-box"
            borderColor="#28282860"
            sx={{ cursor: "default" }}
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                width={indicatorWidth.get()}
                bgcolor="#b1e3ff"
                zIndex={10}
            />
            <Typography zIndex={20} fontSize={12} color="text.secondary">
                {hovered ? hoverText.get() : displayText.get()}
            </Typography>
        </Box>
    );
});

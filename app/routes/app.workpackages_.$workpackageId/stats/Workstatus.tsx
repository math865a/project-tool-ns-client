import { observer } from "mobx-react-lite";
import { useWorkpackage } from "~/src/state";
import { scaleLinear } from "@visx/scale";
import { computed } from "mobx";
import { Box, Paper, Typography } from "@mui/material";
import { useElementSize, useHover, useMergedRef } from "@mantine/hooks";
import { DateTime } from "luxon";

export const WorkStatus = observer(() => {
    const {
        Gantt: {
            Store: {
                ActivityStore: { Plan },
            },
        },
    } = useWorkpackage();

    const { ref: sizeRef, width } = useElementSize();

    const scale = computed(() => {
        return scaleLinear({
            domain: [0, Plan?.Work.raw.total ?? 0],
            range: [0, width],
        });
    });

    const indicatorWidth = computed(() => {
        return scale.get()(Plan?.Work.raw.completed ?? 0);
    });

    const hoverText = computed(() => {
        if (!Plan) return "";
        if (Plan.Interval.isFinished)
            return Plan.Interval.display.counts.long.workDays;
        return (
            Plan.Interval.counts.workDaysComplete +
            " / " +
            Plan.Interval.counts.workDays +
            " arbejdsdage"
        );
    });

    const displayText = computed(() => {
        if (!Plan) return "";
        return (
            Plan.Work.work.completed + " / " + Plan.Work.work.total + " timer"
        );
    });

    const { ref: hoverRef, hovered } = useHover();

    const ref = useMergedRef(hoverRef, sizeRef);

    return (
        <Box
            flexGrow={1}
            ref={ref}
            height={30}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
            position="relative"
            overflow="hidden"
            component={Paper}
            variant="outlined"
            mt={0.5}
            mr={2}
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

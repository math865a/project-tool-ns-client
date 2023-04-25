import { Box } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { Axis } from "@visx/axis";
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect } from "react";
import { useWorkpackage } from "useWorkpackage";
import { HEADER_HEIGHT } from "gantt/constants";
import { useTimelineDrag } from "../shared";
import { HeaderTick } from "./HeaderTick";
import { useElementSize } from "@mantine/hooks";

export const TimelineHeader = observer(() => {
    const { Gantt } = useWorkpackage();

    const { ref, width } = useElementSize();

    useEffect(() => {
        if (width !== 0 && width !== Gantt.Dimensions.timelineWidth) {
            Gantt.Dimensions.updateTimelineWidth = width;
        }
    }, [width]);

    const { onMouseDown } = useTimelineDrag();

    return (
        <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            right={0}
            ref={ref}
            sx={{ cursor: Gantt.Timeline.Slide.cursor }}
            onMouseDown={onMouseDown}
        >
            <svg
                width={Gantt.Dimensions.timelineWidth}
                height={HEADER_HEIGHT}
                style={{ position: "absolute", left: 0, top: 0 }}
                key={Gantt.Dimensions.timelineWidth}
            >
                <Axis
                    orientation="top"
                    hideTicks
                    scale={Gantt.Timeline.xScale}
                    top={HEADER_HEIGHT}
                    tickValues={Gantt.Timeline.Intervals.ticks}
                    tickFormat={(_, index) =>
                        Gantt.Timeline.Intervals.intervals.headerIntervals[
                            index
                        ].primary
                    }
                    //tickLength={HEADER_HEIGHT}
                    tickComponent={(props) => <HeaderTick {...props} />}
                    key={`${Gantt.Timeline.Boundary.x}-${Gantt.Timeline.Interval.start}`}
                    tickLineProps={{ stroke: "rgba(224, 224, 224, 1)" }}
                    stroke="rgba(224, 224, 224, 1)"
                />
            </svg>
        </Box>
    );
});

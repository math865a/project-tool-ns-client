import { Box } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { Axis } from "@visx/axis";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWorkpackage } from "useWorkpackage";

import { HeaderTick } from "./HeaderTick";
import { GanttColumn } from "~/src/features/gantt/types";
import { HEADER_HEIGHT } from "gantt/constants";
import { useTimelineDrag } from "../shared";


export const TimelineHeader = observer(() => {
    const { Gantt } = useWorkpackage();

    const api = useGridApiContext();

    useEffect(() => {
        Gantt.Dimensions.setTimelineWidth(
            api.current.getColumn("timeline").computedWidth
        );

        api.current.getAllColumns().forEach((col) => {
            Gantt.Table.updateColumnWidth(
                col.field as GanttColumn,
                col.computedWidth
            );
        });
    }, []);


    const {onMouseDown} = useTimelineDrag()

    return (
        <Box
            width={Gantt.Dimensions.timelineWidth}
            height={HEADER_HEIGHT}
            component="div"
            position="relative"
           sx={{cursor: Gantt.Timeline.TimelineDrag.cursor}}
            onMouseDown={onMouseDown}
        >
            <svg
                width={Gantt.Dimensions.timelineWidth}
                height={HEADER_HEIGHT}
                style={{ position: "absolute", left: 0, top: 0 }}
            >
                <Axis
                    orientation="top"
                    hideTicks
                    scale={Gantt.Timeline.xScale}
                    top={HEADER_HEIGHT}
                    tickValues={Gantt.TimelineIntervals.ticks}
                    tickFormat={(_, index) =>
                        Gantt.TimelineIntervals.intervals.headerIntervals[index]
                            .primary
                    }
                    //tickLength={HEADER_HEIGHT}
                    tickComponent={(props) => <HeaderTick {...props} />}
                    key={`${Gantt.Timeline.dtBounds}-${Gantt.Timeline.ds}`}
                    tickLineProps={{ stroke: "rgba(224, 224, 224, 1)" }}
                    stroke="rgba(224, 224, 224, 1)"
                />
            </svg>
     
        </Box>
    );
});

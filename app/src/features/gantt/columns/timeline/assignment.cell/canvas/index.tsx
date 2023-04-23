import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { Assignment } from "gantt-models";
import { ROW_HEIGHT } from "gantt/constants";
import { InBounds } from "./InBounds";
import { OutOfBounds } from "./OutOfBounds";
import { useSchedulingCanvas } from "./useSchedulingCanvas";

const SchedulingCanvas = observer(
    ({ Assignment }: { Assignment: Assignment }) => {
        const { Gantt } = useWorkpackage();

        const schedulingProps = useSchedulingCanvas(Assignment.Canvas);

        return (
            <Box position="absolute" left={0} top={0} right={0} bottom={0}>
                <svg width={Gantt.Dimensions.timelineWidth} height={ROW_HEIGHT}>
                    {(schedulingProps.isDragging ||
                        Gantt.Timeline.Drag.isDragging ||
                        Assignment.Canvas.isHoveringAllocation ||
                        Assignment.Canvas.isDraggingAllocation) && (
                        <OutOfBounds
                            Canvas={Assignment.Canvas}
                            rectProps={{ onMouseUp: schedulingProps.onMouseUp }}
                        />
                    )}
                      
                    <InBounds
                        Canvas={Assignment.Canvas}
                        schedulingProps={schedulingProps}
                    />
                
                </svg>
            </Box>
        );
    }
);

export default SchedulingCanvas
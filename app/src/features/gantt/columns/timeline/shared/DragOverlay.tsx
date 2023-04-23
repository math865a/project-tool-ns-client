import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { useTimelineDrag } from "../../../TimelineDragProvider";

const TimelineDragOverlay = observer(() => {
    const {
        Gantt: {
            Timeline: { Slide: M },
            Dimensions,
        },
    } = useWorkpackage();

    const { onMouseMove, onMouseUp } = useTimelineDrag();

    if (!M.isDragging) return null;
    return (
        <Box
            width={Dimensions.width}
            height={Dimensions.height}
            position="absolute"
            top={0}
            left={0}
            sx={{ zIndex: (theme) => theme.zIndex.tooltip }}
        >
            <svg
                width={Dimensions.width}
                height={Dimensions.height}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    cursor: "grabbing",
                }}
            >
                <rect
                    width={Dimensions.width}
                    height={Dimensions.height}
                    x={0}
                    y={0}
                    fill="transparent"
                    stroke="transparent"
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseOut={onMouseUp}
                />
            </svg>
        </Box>
    );
});

export default TimelineDragOverlay;
//left={Dimensions.width - Dimensions.timelineWidth}

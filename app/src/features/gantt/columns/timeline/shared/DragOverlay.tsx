import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { useTimelineDrag } from "../../../TimelineDragProvider";

const TimelineDragOverlay = observer(() => {
    const {
        Gantt: {
            Timeline: { TimelineDrag: M },
            Dimensions,
        },
    } = useWorkpackage();

    const { onMouseMove, onMouseUp } = useTimelineDrag();

    if (!M.isDragging) return null;
    return (
        <Box
            width={Dimensions.dialogDimensions.width}
            height={Dimensions.dialogDimensions.height}
            position="absolute"
            top={0}
            left={0}
            sx={{ zIndex: (theme) => theme.zIndex.tooltip }}
        >
            <svg
                width={Dimensions.dialogDimensions.width}
                height={Dimensions.dialogDimensions.height}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    cursor: "grabbing",
                }}
            >
                <rect
                    width={Dimensions.dialogDimensions.width}
                    height={Dimensions.dialogDimensions.height}
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
//left={Dimensions.dialogDimensions.width - Dimensions.timelineWidth}

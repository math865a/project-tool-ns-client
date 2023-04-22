import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { AssignmentCanvas } from "gantt-models";
import { ROW_HEIGHT } from "gantt/constants";
import { useSchedulingCanvas } from "./useSchedulingCanvas";
import { DateTime as dt } from "luxon";
export const InBounds = observer(
    ({
        Canvas,
        schedulingProps: { days, isDragging, ...dragProps },
    }: {
        Canvas: AssignmentCanvas;
        schedulingProps: ReturnType<typeof useSchedulingCanvas>;
    }) => {
        const { Gantt } = useWorkpackage();

        return (
            <g>
                {days.map((day) => (
                    <g
                        transform={`translate(${Gantt.Timeline.xScale(
                            (day.start as dt).toMillis()
                        )})`}
                    >
                        <rect
                            width={Gantt.Timeline.Drag.snapWidth}
                            height={ROW_HEIGHT}
                            fill={Canvas.selectionColor}
                        />
                    </g>
                ))}

                <g transform={`translate(${Canvas.inBounds.x},0)`}>
                    {isDragging && (
                        <g>
                            <rect
                                width={Canvas.inBounds.w}
                                height={ROW_HEIGHT}
                                fill="transparent"
                                onMouseMove={dragProps.onMouseMove}
                                onMouseUp={dragProps.onMouseUp}
                                style={{ cursor: "grabbing" }}
                            />
                        </g>
                    )}
                    <rect
                        style={{ cursor: isDragging ? "grabbing" : "pointer" }}
                        fill="transparent"
                        width={Canvas.inBounds.w}
                        height={ROW_HEIGHT}
                        {...dragProps}
                    />
                </g>
            </g>
        );
    }
);

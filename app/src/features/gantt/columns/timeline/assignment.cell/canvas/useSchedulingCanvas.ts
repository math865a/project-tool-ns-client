import { useNavigate } from "@remix-run/react";
import useDrag, { HandlerArgs } from "@visx/drag/lib/useDrag";
import { DateTime as dt, Interval as int } from "luxon";
import { useCallback, useState } from "react";
import { useWorkpackage } from "useWorkpackage";
import { AssignmentCanvas } from "gantt-models";
import { normalize } from "~/util";

export const useSchedulingCanvas = (Canvas: AssignmentCanvas) => {
    const { Gantt } = useWorkpackage();
    const navigate = useNavigate();

    const [days, setDays] = useState<int[]>([]);

    const onDragStart = useCallback(
        (args: HandlerArgs) => {
            if (Canvas.isDraggingAllocation || Gantt.Timeline.Drag.isDragging)
                return;
            Canvas.isDragging = true;
            const { dx, x = 0 } = args;
            const t = normalize(Gantt.Timeline.xScale.invert(x));
            setDays(() => [int.fromDateTimes(t, t.plus({ days: 1 }))]);
        },
        [setDays, Gantt.Timeline.xScale, Canvas]
    );

    const onDragMove = useCallback(
        (args: HandlerArgs) => {
            if (
                Canvas.isHoveringAllocation ||
                Canvas.isDraggingAllocation ||
                Gantt.Timeline.Drag.isDragging
            )
                return;
            const { dx, x = 0 } = args;
            const ts = normalize(Gantt.Timeline.xScale.invert(x), 12);
            const te = normalize(Gantt.Timeline.xScale.invert(x + dx), 12);
            const interval = int.fromDateTimes(dt.min(ts, te), dt.max(ts, te));
            setDays(() => interval.splitBy({ days: 1 }));
        },
        [setDays, Gantt.Timeline.xScale, Canvas]
    );

    const onDragEnd = useCallback(
        (args: HandlerArgs) => {
            if (Canvas.isDraggingAllocation || Gantt.Timeline.Drag.isDragging)
                return;

            if (days.length > 0) {
                const interval = int.merge(days)[0];
                setDays([]);
                const id = Canvas.addAllocation(interval);
                navigate(`${id}`);
            } else {
                setDays([]);
            }
            Canvas.isDragging = false;
        },
        [days, setDays, Gantt.Timeline.xScale, Canvas]
    );

    const { isDragging, dragStart, dragMove, dragEnd } = useDrag({
        onDragStart,
        onDragMove,
        onDragEnd,
        resetOnStart: true,
    });

    return {
        days: days,
        isDragging: isDragging,
        onMouseDown: dragStart,
        onMouseMove: isDragging ? dragMove : undefined,
        onMouseUp: isDragging ? dragEnd : undefined,
    };
};

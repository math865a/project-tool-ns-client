import { useDrag } from "@visx/drag";
import { MouseTouchOrPointerEvent } from "@visx/drag/lib/useDrag";
import { observer } from "mobx-react-lite";
import { createContext, useContext } from "react";
import { useWorkpackage } from "useWorkpackage";
import { Child } from "~/src/design-system";
import TimelineDragOverlay from "./columns/timeline/shared/DragOverlay";

export type DragHandler = (event: MouseTouchOrPointerEvent) => void;
const TimelineDragHandlerContext = createContext<
    | {
          onMouseDown: DragHandler;
          onMouseMove: DragHandler;
          onMouseUp: DragHandler;
      }
    | undefined
>(undefined);

export const TimelineDragProvider = observer(
    ({ children }: { children?: Child | Child[] }) => {
        const {
            Gantt: {
                Timeline: { Slide: M },
            },
        } = useWorkpackage();

        const { dragStart, dragMove, dragEnd } = useDrag({
            onDragStart: M.handleDragStart,
            onDragMove: M.handleDragMove,
            onDragEnd: M.handleDragEnd,
            resetOnStart: true,
        });

        return (
            <TimelineDragHandlerContext.Provider
                value={{
                    onMouseDown: dragStart,
                    onMouseMove: dragMove,
                    onMouseUp: dragEnd,
                }}
            >
                <TimelineDragOverlay />
                {children}
            </TimelineDragHandlerContext.Provider>
        );
    }
);

export const useTimelineDrag = () => {
    const ctx = useContext(TimelineDragHandlerContext);
    if (!ctx) {
        throw new Error("No drag");
    }
    return ctx;
};

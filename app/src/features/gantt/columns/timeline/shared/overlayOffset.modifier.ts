import { Modifier } from "@dnd-kit/core";
import { action } from "mobx";
import { TimelineEventType } from "gantt/types";

export const overlayOffset: Modifier = action(
    ({ active, transform, activatorEvent }) => {
        const type = (activatorEvent?.target as HTMLDivElement)
            ?.className as TimelineEventType;

        if (!type) return transform;

        if (type === "move") {
            return {
                ...transform,
                x: transform.x + 5,
                y: -25,
            };
        }
        return {
            ...transform,
            y: 0,
        };
    }
);

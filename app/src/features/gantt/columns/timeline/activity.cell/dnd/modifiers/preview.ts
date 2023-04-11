import type { Modifier } from "@dnd-kit/core";
import { action } from "mobx";
import { TimelineEventType } from "gantt/types";
import { ActivityDataBag } from "./data-bag";



export const previewModifier: Modifier = action(
    ({
        active,
        transform,
        activatorEvent,
    }) => {
        const bag = active?.data?.current as ActivityDataBag;
        const element = activatorEvent?.target as HTMLDivElement;
        const rect = active?.rect?.current?.translated;
        if (!bag || !rect || !element || !activatorEvent) return transform;
        const { Bar } = bag;
        const type = element.className as TimelineEventType;

        if (type === "move") {
            //const padding = 5 * Bar.dragDirection;
            return {
                ...transform,
                x: transform.x,// + padding,
                y: -10,
            };
        } else if (type === "resize-start") {
            return {
                ...transform,
                x: transform.x,
                y: 0,
            };
        } else if (type === "resize-end") {
            return {
                ...transform,
                x: -Bar.w0 + transform.x,
                y: Bar.y,
            };
        }
        return transform;
    }
);

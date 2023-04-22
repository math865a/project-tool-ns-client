import { Modifier } from "@dnd-kit/core";
import { TimelineEventType } from "gantt/types";
import _ from "lodash";
import { action } from "mobx";
import { AllocaitonDataBag } from "./data-bag";

export const restrictToTask: Modifier = action(
    ({ active, transform, activatorEvent }) => {
        const bag = active?.data?.current as AllocaitonDataBag;
        const type = (activatorEvent?.target as HTMLDivElement)
            ?.className as TimelineEventType;

        if (!bag || !type) return transform;
        const { Allocation } = bag;
        if (!Allocation.Assignment?.Task?.Bar) return transform;
        const { x1: x1Bound, w: wb } = Allocation.Assignment.Task.Bar.rect;
        const x2Bound = x1Bound + wb;

        const { x1, x2 } = Allocation.Bar.iRect;
        let { x: dx }: { x: number } = transform;
        let ndx = _.clone(dx);

        if (x1 + dx <= x1Bound && type !== "resize-end") {
            ndx = _.round(x1Bound - x1);
        } else if (x2 + dx >= x2Bound && type !== "resize-start") {
            ndx = _.round(x2Bound - x2);
        }
        return {
            ...transform,
            x: ndx,
        };
    }
);

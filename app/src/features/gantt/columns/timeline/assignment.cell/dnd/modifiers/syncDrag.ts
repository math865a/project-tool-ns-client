import { Modifier } from '@dnd-kit/core';
import { TimelineEventType } from "gantt/types";
import { action } from 'mobx';
import { AllocaitonDataBag } from './data-bag';


export const syncDrag: Modifier = action(
    ({ active, transform, activatorEvent }) => {
        const bag = active?.data?.current as AllocaitonDataBag;
        const type = (activatorEvent?.target as HTMLDivElement)
            ?.className as TimelineEventType;

        if (!bag || !type) return transform;
        const { Allocation } = bag;

        let { x: dx } = transform;
        let direction: 'right' | 'left' | 'none' = 'none';
        if (dx > Allocation.Bar.dx) {
            direction = 'right';
        } else if (dx < Allocation.Bar.dx) {
            direction = 'left';
        } else if (dx > 0) {
            direction = 'right';
        } else if (dx < 0) {
            direction = 'left';
        }

        const dxSnap =
            Math.round(dx / Allocation.Bar.Timeline.wDay) *
            Allocation.Bar.Timeline.wDay;

        Allocation.Bar.syncDrag(dxSnap, type, direction);

        return {
            ...transform,
        };
    }
);

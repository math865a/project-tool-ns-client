import { Modifier } from '@dnd-kit/core';
import { TimelineEventType } from 'gantt/types';
import { action } from 'mobx';
import { ActivityDataBag } from './data-bag';

export const barSync: Modifier = action(
    ({ active, transform, activatorEvent }) => {
        const Bar = (active?.data?.current as ActivityDataBag)?.Bar;
        const type = (activatorEvent?.target as HTMLDivElement)
            ?.className as TimelineEventType;

        if (!type || !Bar) return transform;

        let dx = transform.x + Bar.Timeline.TimelineEvent.dxBoundary;
        if (type === 'move') {
            Bar.syncModifier({ dx: dx, dw: 0 }, type);
        } else if (type === 'resize-start') {
            if (Bar.w0 - dx < Bar.Timeline.wDay) {
                dx = Bar.w0 - Bar.Timeline.wDay;
            }
            Bar.syncModifier(
                {
                    dx: dx,
                    dw: -dx,
                },
                type
            );
        } else {
            if (Bar.w0 + dx < Bar.Timeline.wDay) {
                dx = Bar.Timeline.wDay - Bar.w0;
            }

            Bar.syncModifier({ dx: 0, dw: dx }, type);
        }

        return transform;
    }
);

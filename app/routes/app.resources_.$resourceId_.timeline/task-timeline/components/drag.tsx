
import { Child } from 'design';
import { Drag, useDrag } from '@visx/drag';
import { UseDrag } from '@visx/drag/lib/useDrag';
import { observer } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { useTimeline } from '../task-timeline.provider';


const TimelineDragContext = createContext<UseDrag | undefined>(undefined);

const TimelineDragProvider = observer(
    ({ children }: { children: Child | Child[] }) => {
        const Calendar = useTimeline().Calendar
        const Dimensions = useTimeline().Dimensions

        return (
            <Drag
                onDragStart={Calendar.onDragStart}
                onDragMove={Calendar.onDragMove}
                onDragEnd={Calendar.onDragEnd}
                resetOnStart
                width={Dimensions.chartWidth}
                height={window !== undefined ? window.innerHeight * 0.85 : 600}
            >
                {(props) => (
                    <TimelineDragContext.Provider value={props}>
                        {children}
                    </TimelineDragContext.Provider>
                )}
            </Drag>
        );
    }
);

export default TimelineDragProvider;

export const useTimelineDrag = () => {
    const props = useContext(TimelineDragContext);
    if (!props) {
        throw new Error('No drag');
    }
    return props;
};

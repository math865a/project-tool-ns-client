import { Child } from 'design';
import { Drag, useDrag } from '@visx/drag';
import { UseDrag } from '@visx/drag/lib/useDrag';
import { observer } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { useBoard } from '../_provider';
import { IDENTITY_COLUMN_WIDTH } from '../_config/contants';


const DragContext = createContext<UseDrag | undefined>(undefined);

const DragProvider = observer(
    ({ children }: { children: Child | Child[] }) => {
        const Dimensions = useBoard().Dimensions;
        const View = useBoard().View;

        return (
            <Drag
                onDragStart={View.onDragStart}
                onDragMove={View.onDragMove}
                onDragEnd={View.onDragEnd}
                resetOnStart
                width={Dimensions.chartWidth + IDENTITY_COLUMN_WIDTH}
                height={Dimensions.height}
            >
                {(props) => (
                    <DragContext.Provider value={props}>
                        {children}
                    </DragContext.Provider>
                )}
            </Drag>
        );
    }
);

export default DragProvider;

export const useCapacityBoardDrag = () => {
    const props = useContext(DragContext);
    if (!props) {
        throw new Error('No drag');
    }
    return props;
};

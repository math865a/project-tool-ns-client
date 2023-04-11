import { Box } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { observer } from 'mobx-react-lite';
import { ROW_HEIGHT } from '~/pages/capacity/_config/contants';
import { ResourceRow } from '~/pages/capacity/_models';
import { useBoard } from '../../../_provider';
import { useCapacityBoardDrag } from '../../DragProvider';
import { RenderCells } from './RenderCells';

const CapacityRow = observer(
    ({ row: Resource }: GridRenderCellParams<ResourceRow>) => {
        const Board = useBoard();
        const drag = useCapacityBoardDrag();
        return (
            <Box
                width={Board.Dimensions.chartWidth}
                minWidth={Board.Dimensions.chartWidth}
                height={ROW_HEIGHT}
                sx={{
                    '&:hover': {
                        cursor: Board.View.lastDx !== 0 ? "grabbing" :'grab',
                    },
                }}
                position="relative"
                onMouseDown={drag.dragStart}
                onMouseMove={drag.dragMove}
                onMouseUp={drag.dragEnd}
                component="div"
            >
                <svg
                    height={ROW_HEIGHT}
                    width={Board.Dimensions.chartWidth}
                    style={{ position: 'absolute', left: 0, top: 0 }}
                >
                    <RenderCells Resource={Resource} />
                </svg>
            </Box>
        );
    }
);

export default CapacityRow;



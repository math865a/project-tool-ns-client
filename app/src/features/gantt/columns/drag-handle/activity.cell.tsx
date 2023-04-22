import { faGrip } from '@fortawesome/pro-light-svg-icons';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Action } from '~/src/design-system';
import { Activity } from "gantt-models";


export const ActivityDragHandleCell = observer(({ Activity }: { Activity: Activity }) => {
    //const { setActivatorNodeRef, handleProps } = useHandleContext();

    return (
        <Box maxWidth={30} flexGrow={1} display="flex" justifyContent="center">
            {Activity.Interaction.isHovering && (
                <Action.Symbol
                    icon={faGrip}
                   // ref={setActivatorNodeRef}
                    //{...handleProps}
                />
            )}
        </Box>
    );
});


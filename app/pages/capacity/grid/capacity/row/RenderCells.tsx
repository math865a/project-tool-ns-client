import { observer } from 'mobx-react-lite';
import { ResourceRow } from '~/pages/capacity/_models';
import CapacityCell from './CapacityCell';
export const RenderCells = observer(
    ({ Resource }: { Resource: ResourceRow; }) => {
        return (
            <>
                {Resource.Capacities.map((Capacity) => (
                    <CapacityCell Capacity={Capacity} />
                ))}
            </>
        );
    }
);

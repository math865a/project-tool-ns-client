import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Action } from 'design';
import { observer } from 'mobx-react-lite';
import { useBoard } from '../../../../_provider';


const SaveAsNew = observer(() => {
    const View = useBoard().View;
    const ViewStore = useBoard().CapacityViewStore;
    return (
        <>
            {(!View.capacityView && View.hasFiltered) ||
                (View.CapacityView && View.CapacityView.hasChanged) ? (
                <Action.Symbol
                    icon={faPlus}
                    title="Gem som ny visning"
                    iconSize={1.1}
                    onClick={() => ViewStore.createView()} />
            ) : null}
        </>
    );
});

export default SaveAsNew
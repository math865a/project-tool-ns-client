import { faSave } from '@fortawesome/pro-light-svg-icons';
import { Action } from 'design';
import { observer } from 'mobx-react-lite';
import { useBoard } from '../../../../_provider';


const SaveChanges = observer(() => {
    const View = useBoard().View;
    const ViewStore = useBoard().CapacityViewStore;
    return (
        <>
            {(View.CapacityView && View.CapacityView.hasChanged) ? (
                <Action.Symbol
                    icon={faSave}
                    title="Gem ændringer"
                    iconSize={1.1}
                    onClick={() => View.CapacityView !== null
                        ? ViewStore.updateCapacityView(View.CapacityView)
                        : null} />
            ) : null}
        </>
    );
});

export default SaveChanges
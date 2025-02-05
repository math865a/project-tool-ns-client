import { Action } from "design";
import { observer } from "mobx-react-lite";
import { useBoard } from "../../../../_provider";
import { IconPlus } from "@tabler/icons-react";

const SaveAsNew = observer(() => {
    const View = useBoard().View;
    const ViewStore = useBoard().CapacityViewStore;
    return (
        <>
            {(!View.capacityView && View.hasFiltered) ||
            (View.CapacityView && View.CapacityView.hasChanged) ? (
                <Action.Symbol
                    icon={IconPlus}
                    title="Gem som ny visning"
                    iconSize={1.1}
                    onClick={() => ViewStore.createView()}
                />
            ) : null}
        </>
    );
});

export default SaveAsNew;

import { Action } from "design";
import { observer } from "mobx-react-lite";
import { useBoard } from "../../../../_provider";
import { IconTrash } from "@tabler/icons-react";

const ClearView = observer(() => {
    const View = useBoard().View;
    if (!View.capacityView) return null;
    return (
        <Action.Symbol
            icon={IconTrash}
            title="Ryd visning"
            onClick={() => View.setView(null)}
        />
    );
});

export default ClearView;

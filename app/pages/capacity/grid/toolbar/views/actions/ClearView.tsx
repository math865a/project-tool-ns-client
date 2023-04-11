import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { Action } from "design";
import { observer } from "mobx-react-lite";
import { useBoard } from "../../../../_provider";

const ClearView = observer(() => {
    const View = useBoard().View;
    if (!View.capacityView) return null;
    return (
        <Action.Symbol
            icon={faTimes}
            title="Ryd visning"
            onClick={() => View.setView(null)}
        />
    );
});

export default ClearView;

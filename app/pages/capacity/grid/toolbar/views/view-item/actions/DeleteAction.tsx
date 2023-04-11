import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { Action } from "design";
import { observer } from "mobx-react-lite";
import { CapacityView } from "~/pages/capacity/_models";


const DeleteAction = observer(
    ({ CapacityView }: { CapacityView: CapacityView }) => {
        return (
            <Action.Symbol
                icon={faTrash}
                onClick={() => CapacityView.delete()}
                title="Slet visning"
            />
        );
    }
);

export default DeleteAction;

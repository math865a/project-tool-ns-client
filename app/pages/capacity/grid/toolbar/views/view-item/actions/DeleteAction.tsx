import { Action } from "design";
import { observer } from "mobx-react-lite";
import { CapacityView } from "~/pages/capacity/_models";
import { IconTrash } from "@tabler/icons-react";

const DeleteAction = observer(
    ({ CapacityView }: { CapacityView: CapacityView }) => {
        return (
            <Action.Symbol
                icon={IconTrash}
                onClick={() => CapacityView.delete()}
                title="Slet visning"
            />
        );
    }
);

export default DeleteAction;

import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Action } from "design";
import { observer } from "mobx-react-lite";
import { CapacityView } from "~/pages/capacity/_models";

const MakeDefaultAction = observer(
    ({ CapacityView }: { CapacityView: CapacityView }) => {
        return (
            <Action.Symbol
                icon={CapacityView.isDefault ? IconStarFilled : IconStar}
                symbolProps={{
                    color: CapacityView.isDefault ? "#F6DB79" : undefined,
                }}
                onClick={CapacityView.toggleDefault}
                title={
                    CapacityView.isDefault
                        ? "Standardvisning"
                        : "Gør til standardvisning"
                }
            />
        );
    }
);

export default MakeDefaultAction;

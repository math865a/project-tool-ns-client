import { faStar as notDefaultStar } from "@fortawesome/pro-light-svg-icons";
import { faStar as defaultStar } from "@fortawesome/pro-solid-svg-icons";
import { Action } from "design";
import { observer } from "mobx-react-lite";
import { CapacityView } from "~/pages/capacity/_models";

const MakeDefaultAction = observer(
    ({ CapacityView }: { CapacityView: CapacityView }) => {
        return (
            <Action.Symbol
                icon={CapacityView.isDefault ? defaultStar : notDefaultStar}
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

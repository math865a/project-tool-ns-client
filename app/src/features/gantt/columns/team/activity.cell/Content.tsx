import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";
import { Summary } from "./Summary";
import { Placeholder } from "./Placeholder";

export const Content = observer(
    ({ Activity, allowed }: { Activity: Activity; allowed: boolean }) => {
        if (Activity.Team.length > 0) {
            return <Summary Activity={Activity} />;
        }
        return <Placeholder allowed={allowed} />;
    }
);


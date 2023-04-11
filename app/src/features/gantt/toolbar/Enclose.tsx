import { faArrowsLeftRightToLine } from "@fortawesome/pro-light-svg-icons";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { useGantt } from "useGantt";


export const Enclose = observer(() => {
    const Gantt = useGantt()

    return (
        <Action.TextButton
            disabled={Gantt.Timeline.isCurrentlyNodeSpan}
            text="Overblik"
            icon={faArrowsLeftRightToLine}
            onClick={() => Gantt.Timeline.captureNodeSpan()}
        />
    );
});



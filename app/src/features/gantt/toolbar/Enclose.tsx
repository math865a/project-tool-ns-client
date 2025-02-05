import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { useGantt } from "useGantt";
import { IconArrowsDiff } from "@tabler/icons-react";

export const Enclose = observer(() => {
    const Gantt = useGantt();

    return (
        <Action.TextButton
            disabled={Gantt.Timeline.isCurrentlyNodeSpan}
            text="Overblik"
            icon={IconArrowsDiff}
            onClick={() => Gantt.Timeline.captureNodeSpan()}
        />
    );
});

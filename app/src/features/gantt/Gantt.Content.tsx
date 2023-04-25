import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { GanttGrid } from "./Gantt.Grid";
import { GanttAssignmentMenu } from "./assignment-menu/AssignmentMenu";

import { GanttNoRows } from "./Gantt.NoRows";
import { GanttContextMenu } from "./context-menu";

export const GanttContent = observer(({showToolbar}: {showToolbar?: boolean}) => {
    const { Gantt } = useWorkpackage();

    const content = computed(() => {
        if (Gantt.Store.ActivityStore.Activities.length <= 1) {
            return <GanttNoRows />;
        } else {
            return <GanttGrid showToolbar={showToolbar}/>;
        }
    });

    return (
        <>
            {content.get()}
            <GanttContextMenu />
            <GanttAssignmentMenu />
        </>
    );
});

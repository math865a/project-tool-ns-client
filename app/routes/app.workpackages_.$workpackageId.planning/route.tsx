import { Box } from "@mui/material";
import { useEffect } from "react";
import { Page } from "~/src/design-system";
import { Enclose, GanttPage, TeamMenuAction, TimelineZoom } from "~/src/features";
import { useWorkpackage } from "~/src/state";

export const handle = {
    Actions: GanttActions()
}

function GanttActions(){
    return [<TimelineZoom/>, <Enclose/>, <TeamMenuAction/>]
}



export default function Planning() {
    return (
        <Page.SubLayout>
            <GanttPage />
        </Page.SubLayout>
    );
}

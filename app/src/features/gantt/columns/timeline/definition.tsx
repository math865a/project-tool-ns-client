import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { AssignmentTimelineCell } from "./assignment.cell";
import { ActivityTimelineCell } from "./activity.cell";
import { TimelineHeader } from "./header";
import { ClientOnly } from "remix-utils";

export const timelineColumn: GridColDef<Activity | Assignment> = {
    field: "timeline",
    renderCell: (props) =>
        props.row.kind === "Assignment" ? (
            <AssignmentTimelineCell Assignment={props.row} />
        ) : (
            <ActivityTimelineCell
                {...(props as GridRenderCellParams<Activity>)}
            />
        ),
    flex: 5,
    renderHeader: (props) => (
       <TimelineHeader />
    ),
    sortable: false,
};

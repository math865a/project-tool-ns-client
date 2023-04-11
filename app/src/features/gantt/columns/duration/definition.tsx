import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { ActivityDurationCell } from "./activity.cell";
import { AssignmentDurationCell } from "./assignment.cell";

export const durationColumn: GridColDef<Activity | Assignment> = {
    field: "duration",
    headerName: "Varighed",
    headerAlign: "center",
    renderCell: (props) =>
        props.row.kind === "Assignment" ? (
            <AssignmentDurationCell
                {...(props as GridRenderCellParams<Assignment>)}
            />
        ) : (
            <ActivityDurationCell
                {...(props as GridRenderCellParams<Activity>)}
            />
        ),
    minWidth: 60,
    sortable: false,
};

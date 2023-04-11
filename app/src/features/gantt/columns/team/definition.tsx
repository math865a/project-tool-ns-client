import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { AssignmentDailyWorkCell } from "./assignment.cell";
import { ActivityTeamCell } from "./activity.cell";


export const teamColumn: GridColDef<Activity | Assignment> = {
    field: "team",
    renderCell: (props) => props.row.kind == "Assignment" ? (
        <AssignmentDailyWorkCell {...props as GridRenderCellParams<Assignment>} />
    ) : (
        <ActivityTeamCell {...props as GridRenderCellParams<Activity>} />
    ),
    minWidth: 140,
    headerName: "Team",
    headerAlign: "center",
    flex: 0.5,
    sortable: false,
};

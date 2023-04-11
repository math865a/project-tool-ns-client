import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { ActivityWorkCell } from "./activity.cell";
import { AssignmentWorkCell } from "./assignment.cell";

export const workColumn: GridColDef<Activity | Assignment> = {
    field: "work",
    headerName: "Arbejde",
    headerAlign: "center",
    renderCell: (props) =>
        props.row.kind === "Assignment" ? (
            <AssignmentWorkCell
                {...(props as GridRenderCellParams<Assignment>)}
            />
        ) : (
            <ActivityWorkCell {...(props as GridRenderCellParams<Activity>)} />
        ),
    minWidth: 90,
};

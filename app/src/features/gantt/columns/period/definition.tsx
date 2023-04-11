import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { AssignmentPeriodCell } from "./assignment.cell";
import { ActivityPeriodCell } from "./activity.cell";

export const periodColumn: GridColDef<Activity | Assignment> = {
    field: "period",
    headerName: "Periode",
    align: "center",
    renderCell: (props) =>
        props.row.kind === "Assignment" ? (
            <AssignmentPeriodCell
                {...(props as GridRenderCellParams<Assignment>)}
            />
        ) : (
            <ActivityPeriodCell
                {...(props as GridRenderCellParams<Activity>)}
            />
        ),
    minWidth: 150,
    flex: 0.5,
    headerAlign: "center",
    sortable: false,
};

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { AssignmentIdentityCell } from "./assignment.cell";
import { ActivityIdentityCell } from "./activity.cell";

export const identityColumn: GridColDef<Activity | Assignment> = {
    field: "identity",
    headerName: "Aktivitet",
    renderCell: (props) =>
        props.row.kind === "Assignment" ? (
            <AssignmentIdentityCell Assignment={props.row} />
        ) : (
            <ActivityIdentityCell
                {...(props as GridRenderCellParams<Activity>)}
            />
        ),
    valueGetter: (params) =>
        params.row.kind !== "Assignment" ? params.row.name : undefined,
    minWidth: 175,
    width: 175,
    flex: 1,
    headerAlign: "center",
};

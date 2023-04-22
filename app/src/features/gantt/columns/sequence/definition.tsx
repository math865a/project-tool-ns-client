import { GridColDef } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";

export const sequenceColumn: GridColDef<Activity | Assignment> = {
    field: "sequence",
    valueGetter: (props) =>
        props.row.kind !== "Assignment" ? props.row.Row.sequence : 1,
};

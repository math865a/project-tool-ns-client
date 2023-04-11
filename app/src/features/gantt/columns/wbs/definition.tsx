import { GridColDef } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { ActivityWBSCell } from "./activity.cell";

export const wbsColumn: GridColDef<Activity | Assignment> = {
    field: "wbs",
    headerName: "",
    renderCell: (props) =>
        props.row.kind !== "Assignment" ? (
            <ActivityWBSCell Activity={props.row} />
        ) : (
            <></>
        ),
    minWidth: 50,
    maxWidth: 50,
    resizable: false,
    sortable: false,
};

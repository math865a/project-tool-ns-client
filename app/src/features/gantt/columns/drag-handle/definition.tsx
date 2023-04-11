import { GridColDef } from "@mui/x-data-grid-pro";
import { Activity, Assignment } from "gantt-models";
import { ActivityDragHandleCell } from "./activity.cell";

export const dragHandleDefinition: GridColDef<Activity | Assignment> = {
    field: "dragHandle",
    headerName: "",
    renderCell: (props) =>
        props.row.kind !== "Assignment" ? (
            <ActivityDragHandleCell Activity={props.row} />
        ) : (
            <></>
        ),
    minWidth: 40,
    maxWidth: 40,
    resizable: false,
    sortable: false,
};

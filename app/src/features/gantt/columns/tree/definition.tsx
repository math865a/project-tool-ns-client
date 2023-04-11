import { DataGridProProcessedProps } from "@mui/x-data-grid-pro/models/dataGridProProps";
import { ActivityTreeCell } from "./activity.cell";


export const treeColumn: DataGridProProcessedProps["groupingColDef"] = {
    headerName: "",
    renderCell: (props) =>
        props.row.kind === "Assignment" ? <></> : <ActivityTreeCell {...props} />,
    minWidth: 50,
    maxWidth: 50,
    resizable: false,
    sortable: false,
};



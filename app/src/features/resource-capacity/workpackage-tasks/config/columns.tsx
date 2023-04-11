import { GridColDef } from "@mui/x-data-grid-pro";
import { Grid } from "~/src/design-system";
import TimelineHeader from "../components/TimelineHeader";
import TimelineRow from "../components/TimelineRow";
import { IWorkpackageTask } from "../../_state/useWorkpackageTasks";

export const taskGridColumns: GridColDef<IWorkpackageTask>[] = [
    {
        field: "taskName",
        headerName: "Opgave",
        valueGetter: (props) => props.row.taskName,
        renderCell: Grid.renderCellExpand,
        width: 300,
        headerAlign: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        resizable: false,
    },
    {
        field: "startDate",
        headerName: "Startdato",
        valueGetter: (props) => props.row.displayInterval.start,
        renderCell: Grid.renderCellExpand,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        resizable: false,
    },
    {
        field: "endDate",
        headerName: "Slutdato",
        valueGetter: (props) => props.row.displayInterval.end,
        renderCell: Grid.renderCellExpand,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        resizable: false,
    },
    {
        field: "workDisplay",
        headerName: "Arbejde",
        valueGetter: (props) => props.row.workDisplay,
        renderCell: Grid.renderCellExpand,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        resizable: false,
    },
    {
        field: "timeline",
        renderHeader: () => <TimelineHeader />,
        renderCell: (props) => <TimelineRow {...props} />,
        flex: 1,
        resizable: false,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
];

import { GridColDef } from "@mui/x-data-grid-pro";
import { IProjectManagerRow } from "./types";
import { Grid } from "~/src/design-system";
import { IdentityCell } from "./Identity.Cell";

export const columns: GridColDef<IProjectManagerRow>[] = [
    {
        field: "linkCell",
        headerName: "",
        width: 50,
        align: "center",
        renderCell: (props) => (
            <Grid.LinkCell to={`${props.row.id}`} id={props.row.id} />
        ),
    },
    {
        field: "name",
        headerName: "Navn",
        minWidth: 225,
        headerAlign: "center",
        valueGetter: (props) => props.row.name,
        renderCell: (props) => <IdentityCell row={props.row} />,
    },
];

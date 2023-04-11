import { ResourceTypeViewRow } from "@math865a/project-tool.types";
import { GridColDef } from "@mui/x-data-grid-pro";
import { Grid } from "~/src/design-system";

export const columns: GridColDef<ResourceTypeViewRow>[] = [
    {
        field: "linkCell",
        headerName: "",
        width: 50,
        align: "center",
        renderCell: (props) => <Grid.LinkCell to={`${props.row.node.id}`} id={props.row.node.id}/>
    },
    {
        field: "contract",
        headerName: "Kontrakt",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        valueGetter: (props) => props.row.contract.name,
    },
    {
        field: "name",
        headerName: "Navn",
        headerAlign: "center",
        flex:1,
        valueGetter: (props) => props.row.node.name,
    },

    {
        field: "abbrevation",
        headerName: "Forkortelse",
        minWidth: 115,
        headerAlign: "center",
        valueGetter: (props) => props.row.node.abbrevation,
    },
    {
        field: "typeNo",
        headerName: "Type",
        minWidth: 120,
        headerAlign: "center",
        align: "center",
        valueGetter: (props) =>props.row.node.typeNo,
        valueFormatter: props =>  "Type " + props.value
     },
    {
        field: "resourceCount",
        headerName: "Ressourcer",
        headerAlign: "center",
        align: "center",
        valueGetter: (props) => `${props.row.resourceCount}`,
    },
    {
        field: "salesDefault",
        headerName: "Salgspris",
        headerAlign: "center",
        minWidth: 140,
        align: "center",
        valueGetter: (props) => props.row.node.salesDefault !== 0 ? props.row.node.salesDefault + " kr/t" : "-",
    },
    {
        field: "salesOvertime",
        headerName: "Salgspris (overtid)",
        headerAlign: "center",
        minWidth: 140,
        align: "center",
        valueGetter: (props) => props.row.node.salesOvertime !== 0 ? props.row.node.salesOvertime + " kr/t" : "-",
    },
];
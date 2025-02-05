//import { ResourceViewRow }
import { GridColDef } from "@mui/x-data-grid-pro";

import _ from "lodash";
import { Grid } from "~/src/design-system";
import { IdentityCell } from "./Identity.Cell";

export const columns: GridColDef<any>[] = [
    {
        field: "linkCell",
        headerName: "",
        width: 50,
        align: "center",
        renderCell: (props) => (
            <Grid.LinkCell to={`${props.row.node.id}`} id={props.row.node.id} />
        ),
    },
    {
        field: "name",
        headerName: "Navn",
        minWidth: 225,
        headerAlign: "center",
        valueGetter: (props) => props.row.node.name,
        renderCell: (props) => <IdentityCell node={props.row.node} />,
    },
    {
        field: "initials",
        headerName: "Initialer",
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: (props) => props.row.node.initials,
    },
    {
        field: "cost.default",
        headerName: "Kostpris",
        valueGetter: (props) =>
            props.row.node.costDefault !== 0
                ? props.row.node.costDefault + " kr/t"
                : "-",
        headerAlign: "center",
        align: "center",
        width: 145,
    },
    {
        field: "cost.overtime",
        headerName: "Kostpris (overtid)",
        valueGetter: (props) =>
            props.row.node.costOvertime !== 0
                ? props.row.node.costOvertime + " kr/t"
                : "-",
        headerAlign: "center",
        align: "center",
        width: 145,
    },
    {
        field: "resourceTypes",
        headerName: "Ressourcetyper",
        headerAlign: "center",
        valueGetter: (props) =>
            _.map(props.row.resourceTypes, (d) => d.name).join(" | "),

        flex: 1,
    },
];

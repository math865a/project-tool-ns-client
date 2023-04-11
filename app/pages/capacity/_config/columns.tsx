import { GridColDef } from "@mui/x-data-grid-pro";
import HeaderRow from "../grid/capacity/header";
import CapacityRow from "../grid/capacity/row";
import IdentityHeader from "../grid/identity/IdentityHeader";
import { IDENTITY_COLUMN_WIDTH } from "./contants";
import ResourceCell from "../grid/identity/ResourceCell";
import { ResourceRow } from "../_models";

export const columnDefinitions: GridColDef<ResourceRow>[] = [
    {
        field: "row",
        headerName: "Ressource",
        headerAlign: "center",
        renderCell: (props) => <ResourceCell {...props} />,
        renderHeader: (props) => <IdentityHeader />,
        width: IDENTITY_COLUMN_WIDTH,
        disableReorder: true,
        disableColumnMenu: true,
        resizable: false,
        sortable: false,
    },
    {
        field: "capacity",
        renderHeader: (props) => <HeaderRow />,
        renderCell: (props) => <CapacityRow {...props} />,
        flex: 1,
        disableReorder: true,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
];

import {
    IconDeviceFloppy,
    IconPencil,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { Tooltip, Typography } from "@mui/material";
import {
    GridActionsCellItem,
    GridColDef,
    GridRowModes,
} from "@mui/x-data-grid-pro";
import { useLoaderData } from "@remix-run/react";
import _ from "lodash";
import { useMemo } from "react";
import AccessGroupColor from "../cells/AccessGroupColor";
import PermissionsCell from "../cells/PermissionsCell";
import UsersCell from "../cells/users-cell/UserCountCell";
import { AccessGroupRow } from "../definitions/types";
import { AccessGroupsLoader } from "../route";
import { useRowState } from "./useRowState";

type Props = ReturnType<typeof useRowState>;

export const useColumns = ({
    rowModesModel,
    handleDeleteClick,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    isEditing,
}: Props) => {
    const { permissionColumns } = useLoaderData<AccessGroupsLoader>();

    const permissions: GridColDef<AccessGroupRow>[] = useMemo(() => {
        const columns: GridColDef<AccessGroupRow>[] = _.map(
            permissionColumns,
            (permissionColumn) =>
                ({
                    field: `permissions.${permissionColumn.name}`,
                    headerName: permissionColumn.name,
                    headerAlign: "center",
                    editable: true,
                    valueGetter: (props) =>
                        props.row.permissions[permissionColumn.name],
                    valueSetter: (props) => {
                        return {
                            ...props.row,
                            permissions: {
                                ...props.row.permissions,
                                [permissionColumn.name]: props.value,
                            },
                        };
                    },
                    renderCell: (props) => (
                        <PermissionsCell
                            {...props}
                            isEditing={
                                rowModesModel[props.row.id]?.mode ===
                                GridRowModes.Edit
                            }
                        />
                    ),
                    renderEditCell: (props) => (
                        <PermissionsCell
                            {...props}
                            isEditing={
                                rowModesModel[props.row.id]?.mode ===
                                GridRowModes.Edit
                            }
                        />
                    ),
                    minWidth: 118,
                    maxWidth: 118,
                    sortable: false,
                    resizable: false,
                    filterable: false,
                    disableColumnMenu: true,
                    disableReorder: true,
                    hideSortIcons: true,
                    pinnable: false,
                    hideable: false,
                    renderHeader: (params) => (
                        <Typography fontSize={12} color="text.secondary">
                            {params.colDef.headerName}
                        </Typography>
                    ),
                } as GridColDef<AccessGroupRow>)
        );
        return columns;
    }, [permissionColumns, rowModesModel]);

    const staticColumns: GridColDef<AccessGroupRow>[] = useMemo(() => {
        return [
            {
                field: "actions",
                type: "actions",
                headerName: "",
                width: 100,
                cellClassName: "actions",
                getActions: ({ id }) => {
                    const isInEditMode =
                        rowModesModel[id]?.mode === GridRowModes.Edit;

                    if (isInEditMode) {
                        return [
                            <Tooltip title="Gem" placement="top" arrow>
                                <GridActionsCellItem
                                    icon={
                                        <IconDeviceFloppy color={"inherit"} />
                                    }
                                    label="Save"
                                    onClick={handleSaveClick(id)}
                                />
                            </Tooltip>,
                            <Tooltip title="Fortryd" placement="top" arrow>
                                <GridActionsCellItem
                                    icon={<IconX color={"inherit"} />}
                                    label="Cancel"
                                    className="textPrimary"
                                    onClick={handleCancelClick(id)}
                                    color="inherit"
                                />
                            </Tooltip>,
                        ];
                    } else if (isEditing) {
                        return [];
                    }

                    return [
                        <Tooltip title="Rediger" placement="top" arrow>
                            <GridActionsCellItem
                                icon={<IconPencil color={"inherit"} />}
                                label="Edit"
                                className="textPrimary"
                                onClick={handleEditClick(id)}
                                color="inherit"
                            />
                        </Tooltip>,
                        <Tooltip title="Slet" placement="top" arrow>
                            <GridActionsCellItem
                                icon={<IconTrash color={"inherit"} />}
                                label="Delete"
                                onClick={handleDeleteClick(id)}
                                color="inherit"
                            />
                        </Tooltip>,
                    ];
                },
            },
            {
                field: "color",
                headerName: "",
                align: "center",
                minWidth: 30,
                maxWidth: 30,
                resizable: false,
                editable: true,
                renderCell: (props) => (
                    <AccessGroupColor color={props.row.color} />
                ),
                renderEditCell: (props) => (
                    <AccessGroupColor color={props.row.color} />
                ),
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                disableReorder: true,
                hideSortIcons: true,
                pinnable: false,
                hideable: false,
            },
            {
                field: "name",
                headerName: "Navn",
                minWidth: 150,
                headerAlign: "center",
                align: "center",
                editable: true,
                valueGetter: (props) => props.row.name,

                filterable: false,
                disableColumnMenu: true,
                disableReorder: true,
                pinnable: false,
                hideable: false,
            },
            {
                field: "users",
                headerName: "Brugere",
                headerAlign: "center",
                align: "center",
                valueGetter: (props) => props.row.users,
                renderCell: (props) => (
                    <UsersCell
                        id={props.id}
                        value={props.value ?? []}
                        field={props.field}
                        rowModesModel={rowModesModel}
                    />
                ),
                renderEditCell: (props) => (
                    <UsersCell
                        id={props.id}
                        value={props.value ?? []}
                        field={props.field}
                        rowModesModel={rowModesModel}
                    />
                ),
                width: 200,
                editable: true,
            },
        ];
    }, [
        handleDeleteClick,
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        rowModesModel,
        isEditing,
    ]);

    const columns = useMemo(() => {
        return [...staticColumns, ...permissions];
    }, [permissions, staticColumns]);

    return columns;
};

/*    {
        field: "isAdmin",
        headerName: "Admin",
        headerAlign: "center",
        align: "center",
        type: "boolean",
        valueGetter: (props) => props.row.isAdmin,
        editable: true,
        width: 75,
    },
    {
        field: "isProjectManagerGroup",
        headerName: "PL Gruppe",
        headerAlign: "center",
        align: "center",
        type: "boolean",
        valueGetter: (props) => props.row.isProjectManagerGroup,
        editable: true,
        width: 75,
    },*/

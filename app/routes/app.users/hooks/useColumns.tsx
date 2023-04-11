import { GridColDef, GridActionsColDef } from "@mui/x-data-grid-pro";
import { DateTime as dt } from "luxon";
import { useMemo } from "react";
import v from "voca";
import { Avatars, Grid } from "~/src/design-system";
import { IdentityCell, PresenceCell } from "../cells";
import { AccessGroupsCell } from "../cells/access-groups";
import { ActionsCell } from "../cells/actions";
import { UserRow } from "../definitions/types";
import { useRowState } from "./useRowState";
import ColorPickerCell from "../cells/Cell.ColorPicker";

type Props = ReturnType<typeof useRowState>;

export const useColumns = (rowState: Props) => {
    const columns: GridColDef<UserRow>[] = useMemo(() => {
        return [
            {
                field: "actions",
                headerName: "",
                width: 100,
                renderCell: ({ id }) => <ActionsCell id={id} {...rowState} />,
                editable: false,
                align: "center",
            },
            {
                field: "isOnline",
                headerName: "",
                headerAlign: "center",
                align: "center",
                minWidth: 40,
                maxWidth: 40,
                resizable: false,
                editable: false,
                sortable: false,
                filterable: false,
                valueGetter: (props) => props.row.isOnline,
                renderCell: (props) => <PresenceCell uid={props.row.uid} />,
            },
            {
                field: "color",
                headerName: "",
                minWidth: 40,
                maxWidth: 40,
                align: "center",
                resizable: false,
                editable: true,
                sortable: false,
                filterable: false,
                valueGetter: (props) => props.row.color,
                renderCell: (props) => (
                    <Avatars.Individual
                        subject={{
                            id: props.row.uid,
                            name: props.row.name,
                            color: props.row.color,
                        }}
                        size={28}
                    />
                ),
                renderEditCell: (props) => <ColorPickerCell {...props} />,
            },
            {
                field: "name",
                headerName: "Navn",
                minWidth: 225,
                headerAlign: "center",
                valueGetter: (props) => props.row.name,
                renderCell: (props) => <IdentityCell node={props.row} />,
                valueParser: (value: string) => v.titleCase(value),
                editable: true,
            },
            {
                field: "email",
                headerName: "E-mail",
                minWidth: 100,
                flex: 1,
                headerAlign: "center",
                valueGetter: (props) => props.row.email,
                renderCell: Grid.renderCellExpand,
                valueParser: (value: string) => v.lowerCase(value),
                editable: true,
            },
            {
                field: "accessGroups",
                headerName: "Adgangsgrupper",
                headerAlign: "center",
                align: "center",
                flex: 1,
                editable: true,
                valueGetter: (props) => props.row.accessGroups,
                renderCell: (props) => (
                    <AccessGroupsCell
                        id={props.id}
                        value={props.value ?? []}
                        field={props.field}
                        rowModesModel={rowState.rowModesModel}
                    />
                ),
                renderEditCell: (props) => (
                    <AccessGroupsCell
                        id={props.id}
                        value={props.value ?? []}
                        field={props.field}
                        rowModesModel={rowState.rowModesModel}
                    />
                ),
            },
            {
                field: "lastSeen",
                headerName: "Senest aktiv",
                headerAlign: "center",
                align: "center",
                valueGetter: (props) =>
                    props.row.lastSeen
                        ? dt
                              .fromMillis(props.row.lastSeen)
                              .toFormat("HH:mm dd/MM/yy")
                        : "-",
                width: 130,
                editable: false,
            },
            {
                field: "isDeactivated",
                headerName: "Deaktiveret",
                headerAlign: "center",
                align: "center",
                type: "boolean",
                valueGetter: (props) => props.row.isDeactivated,
                renderCell: props => <Grid.BooleanCell value={props.value} title={props.value ? "Er deaktiveret" : "Er aktiveret"} />,
                editable: false,
            
            },
            {
                field: "isResource",
                headerName: "Ressource",
                headerAlign: "center",
                align: "center",
                type: "boolean",
                valueGetter: (props) => props.row.isResource,
                renderCell: props => <Grid.BooleanCell value={props.value} title={props.value ? "Er ressource" : "Er ikke ressource"}/>,
                editable: false,
            },
            {
                field: "isProjectManager",
                headerName: "Projektleder",
                headerAlign: "center",
                align: "center",
                type: "boolean",
                valueGetter: (props) => props.row.isProjectManager,
                renderCell: props => <Grid.BooleanCell value={props.value} title={props.value ? "Er projektleder" : "Er ikke projektleder"}/>,
                editable: false,
            },
        ];
    }, [
        rowState.rowModesModel,
        rowState.deleteResource,
        rowState.handleCancelClick,
        rowState.handleDeleteClick,
        rowState.handleEditClick,
        rowState.handleSaveClick,
        rowState.isEditing,
        rowState.mailCredentials,
        rowState.mailWelcome,
        rowState.resetPassword,
        rowState.rows,
        rowState.toggleActive,
        rowState.toggleProjectManager,
    ]);

    return columns;
};

/*{
                    const isInEditMode =
                        rowModesModel[id]?.mode === GridRowModes.Edit;

                    if (isInEditMode) {
                        return [
                            <Tooltip title="Gem" placement="top" arrow>
                                <GridActionsCellItem
                                    icon={
                                        <Symbol
                                            icon={faSave}
                                            size={1}
                                            color="inherit"
                                        />
                                    }
                                    label="Save"
                                    onClick={handleSaveClick(id)}
                                />
                            </Tooltip>,
                            <Tooltip title="Fortryd" placement="top" arrow>
                                <GridActionsCellItem
                                    icon={
                                        <Symbol
                                            icon={faTimes}
                                            size={1}
                                            color="inherit"
                                        />
                                    }
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
                                icon={
                                    <Symbol
                                        icon={faPenToSquare}
                                        size={1}
                                        color="inherit"
                                    />
                                }
                                label="Edit"
                                className="textPrimary"
                                onClick={handleEditClick(id)}
                                color="inherit"
                            />
                        </Tooltip>,
                        <Tooltip title="Slet" placement="top" arrow>
                            <GridActionsCellItem
                                icon={
                                    <Symbol
                                        icon={faTrash}
                                        size={1}
                                        color="inherit"
                                    />
                                }
                                label="Delete"
                                onClick={handleDeleteClick(id)}
                                color="inherit"
                            />
                        </Tooltip>,
                    ];
                },
            }*/

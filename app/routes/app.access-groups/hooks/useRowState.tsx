import {
    GridEventListener,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    MuiEvent,
} from "@mui/x-data-grid-pro";
import * as React from "react";
import { AccessGroupRow } from "../definitions/types";
import { useLoaderData } from "@remix-run/react";
import { AccessGroupsLoader } from "../route";
import { useTransport } from "./useTransport";
import _ from "lodash";
import { useDialogState } from "~/src/hooks/useDialog";

export const useRowState = () => {
    const { data } = useLoaderData<AccessGroupsLoader>();
    const { createAccessGroup, updateAccessGroup, deleteAccessGroup } =
        useTransport();
    const [rows, setRows] = React.useState<AccessGroupRow[]>(data);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );
    React.useEffect(() => {
        const oldData = _.map(rows, v => _.omit(v, 'isNew'));
        if (!_.isEqual(oldData, data)){
            setRows(data)
        }
    }, [data]);

    const handleCreateClick = () => {
        const newRow = new AccessGroupRow("Ny adgangsgruppe", true);
        setRows((prev) => [...prev, newRow]);
        setRowModesModel({
            ...rowModesModel,
            [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        });
    };

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
        deleteAccessGroup(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: AccessGroupRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((prev) =>
            prev.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        if (newRow.isNew) {
            createAccessGroup(newRow);
        } else {
            updateAccessGroup(newRow);
        }

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const isEditing = React.useMemo(() => {
        return Object.values(rowModesModel).some(
            (rowMode) => rowMode.mode === GridRowModes.Edit
        );
    }, [rowModesModel]);

    return {
        rows,
        rowModesModel,
        handleRowEditStart,
        handleCreateClick,
        handleRowEditStop,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        handleCancelClick,
        processRowUpdate,
        handleRowModesModelChange,
        isEditing,
    };
};

/*import {
    GridEventListener,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    MuiEvent,
} from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import React, { useEffect, useState } from "react";
import { useViewData } from "../../hooks";
import { AccessGroupRow, Permissions } from "../definitions/types";
import { useTransport } from "./useTransport";

export const useRowState = (closeMenu: () => void) => {
    const { data: initialRows, permissionColumns } = useViewData();
    
    const [rows, setRows] = useState<AccessGroupRow[]>(initialRows);

    useEffect(() => {
        setRows(initialRows);
    }, [initialRows]);

    const reverseChange = (oldRow: AccessGroupRow) => {
        const exists = rows.find((d) => d.id === oldRow.id);
        if (exists) {
            setRows(rows.map((d) => (d.id === oldRow.id ? oldRow : d)));
        } else {
            setRows([...rows, oldRow]);
        }
    };

    const { persistName, persistPermissions, persistDelete } = useTransport(reverseChange);



    const updateName = (id: string, name: string) => {
        const rowIndex = rows.findIndex((d) => d.id === id);
        const oldRow = rows[rowIndex];
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, name } : row))
        );
        persistName(id, name, oldRow);
    };

    const validateName = (id: string, name: string): string | boolean => {
        const isDuplicate = rows.some((d) => d.name === name && d.id !== id);
        if (isDuplicate) {
            return "Adgangsgruppenavn er allerede i brug";
        }
        return true;
    };


    const updatePermission = (
        accessGroupId: string,
        pageName: string,
        permission: keyof Permissions,
        value: boolean
    ) => {
        const oldRow = rows.find((d) => d.id === accessGroupId);
        if (!oldRow) return;
        const newRows = rows.map(row => {
            if (row.id === accessGroupId) {
                const newPermissions = {...row.permissions};
                newPermissions[pageName][permission] = value;
                return {
                    ...row,
                    permissions: newPermissions,
                };
            } else {
                return row;
            }
        });
        setRows(newRows)
        persistPermissions(accessGroupId, pageName, permission, value, oldRow);
    }


    
    const handleDelete = (id: GridRowId) => () => {
        closeMenu();
        setRows(prev => prev.filter((row) => row.id !== id));
        persistDelete(id);
    };

    return {
        rows,
        updateName,
        validateName,
        updatePermission,
        handleDelete
    };
};
*/

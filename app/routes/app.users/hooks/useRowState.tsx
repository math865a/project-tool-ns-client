import {
    GridEventListener,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    MuiEvent,
} from "@mui/x-data-grid-pro";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import { UserRow } from "../definitions";
import { UsersLoader } from "../route";
import { useTransport } from "./useTransport";

export const useRowState = ({
    updateUser,
    deleteUser,
    createProjectManager,
    deleteProjectManager,
    deleteResourceProfile,
    resetPassword,
    mailCredentials,
    mailWelcome,
    splitUser,
    mergeUser,
}: ReturnType<typeof useTransport>) => {
    const { rows: initialRows } = useLoaderData<UsersLoader>();
    const [rows, setRows] = React.useState<UserRow[]>(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );
    React.useEffect(() => {
        if (initialRows.length > rows.length){
            setRows(initialRows);
        }
    }, [initialRows]);

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

    const handleDeleteClick = (id: GridRowId) => {
        setRows((prev) => prev.filter((row) => row.uid !== id));
        deleteUser(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = (newRow: UserRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((prev) =>
            prev.map((row) => (row.uid === newRow.uid ? updatedRow : row))
        );

        updateUser(newRow);

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const toggleProjectManager = (user: UserRow) => {
        const newRow = { ...user, isProjectManager: !user.isProjectManager };
        setRows((prev) =>
            prev.map((row) => (row.uid === newRow.uid ? newRow : row))
        );
        if (newRow.isProjectManager) {
            createProjectManager(newRow);
        } else {
            deleteProjectManager(newRow.uid);
        }
    };

    const toggleActive = (user: UserRow) => {
        const newRow = { ...user, isDeactivated: !user.isDeactivated };
        setRows((prev) =>
            prev.map((row) => (row.uid === newRow.uid ? newRow : row))
        );

        updateUser(newRow);
    };

    const deleteResource = (user: UserRow) => {
        const newRow = { ...user, isResource: false };
        setRows((prev) =>
            prev.map((row) => (row.uid === newRow.uid ? newRow : row))
        );
        deleteResourceProfile(newRow.uid);
    };

    const split = (user: UserRow) => {
        const newUser = { ...user, isResource: false };
        setRows((prev) =>
            prev.map((row) => (row.uid === newUser.uid ? newUser : row))
        );
        splitUser(user.uid);
    };

    const merge = (user: UserRow, connectId: string) => {
        const newUser = { ...user, isResource: true };
        setRows((prev) =>
            prev.map((row) => (row.uid === newUser.uid ? newUser : row))
        );
        mergeUser(user.uid, connectId);
    };

    const isEditing = React.useMemo(() => {
        return Object.values(rowModesModel).some(
            (rowMode) => rowMode.mode === GridRowModes.Edit
        );
    }, [rowModesModel]);

    const forwardCredentials = (uid: GridRowId) => {
        mailCredentials(uid);
    }

    return {
        rows,
        rowModesModel,
        handleRowEditStart,
        handleRowEditStop,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        handleCancelClick,
        processRowUpdate,
        handleRowModesModelChange,
        isEditing,
        toggleActive,
        toggleProjectManager,
        deleteResource,
        mailWelcome,
        resetPassword,
        mailCredentials,
        split,
        merge,
        forwardCredentials
    };
};

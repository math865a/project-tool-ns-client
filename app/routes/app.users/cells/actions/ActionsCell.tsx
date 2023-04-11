import { GridRowId, GridRowModes } from "@mui/x-data-grid-pro";
import { useRowState } from "../../hooks/useRowState";
import { useMemo } from "react";
import EditingActions from "./EditingActions";
import DisplayActions from "./DisplayActions";
import { useMenuState } from "~/src/hooks/useMenu";
import { ActionsMenu } from "./ActionsMenu";

export type ActionsCellProps = ReturnType<typeof useRowState> & {
    id: GridRowId;
};
export function ActionsCell({
    isEditing,
    rowModesModel,
    id,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    ...rest
}: ActionsCellProps) {
    const { handleOpen, ...menuProps } = useMenuState();

    const isEditingThisRow = useMemo(() => {
        return rowModesModel[id]?.mode === GridRowModes.Edit;
    }, [rowModesModel, id]);

    if (isEditingThisRow) {
        return (
            <EditingActions
                id={id}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
            />
        );
    }
    return (
        <>
            <DisplayActions
                id={id}
                isEditing={isEditing}
                handleOpen={handleOpen}
                open={menuProps.open}
                handleEditClick={handleEditClick}
            />
            <ActionsMenu id={id} {...menuProps} {...rest} />
        </>
    );
}

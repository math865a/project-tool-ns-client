import { faPencil, faTrash } from "@fortawesome/pro-light-svg-icons";
import { GridRowId } from "@mui/x-data-grid-pro";

import { Stack } from "@mui/material";
import { Action, Grid } from "~/src/design-system";
import { useRowState } from "../hooks/useRowState";
interface Props
    extends Pick<
        ReturnType<typeof useRowState>,
        "handleDeleteClick" | "handleEditClick" | "isEditing"
    > {
    id: GridRowId;
}

export default function ActionsCell({
    id,
    isEditing,
    handleDeleteClick,
    handleEditClick,
}: Props) {
    const hoverRow = Grid.useViewContext().hoverRow;
    if (!isEditing && hoverRow === id) {
        return (
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Action.Symbol
                    icon={faPencil}
                    iconSize={1}
                    color="inherit"
                    title="Rediger"
                    onClick={handleEditClick(id)}
                />
                <Action.Symbol
                    icon={faTrash}
                    iconSize={1}
                    color="inherit"
                    title="Handlinger"
                    onClick={handleDeleteClick(id)}
                />
            </Stack>
        );
    }
    return <></>;
}

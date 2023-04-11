import { faEllipsisH, faPencil } from "@fortawesome/pro-light-svg-icons";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { Action, Grid } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { ActionsCellProps } from "./ActionsCell";

export type DisplayActionsProps = Pick<
    ActionsCellProps,
    "handleEditClick" | "isEditing" | "id"
> &
    Pick<ReturnType<typeof useMenuState<HTMLButtonElement>>, "handleOpen" | "open">;
export default function DisplayActions({
    handleEditClick,
    id,
    isEditing,
    handleOpen,
    open,
}: DisplayActionsProps) {
    const { hoverRow } = Grid.useViewContext();

    const isHovering = useMemo(() => {
        return hoverRow === id;
    }, [hoverRow, id]);

    if (isEditing || (!open && !isHovering)) {
        return <></>;
    }

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
                icon={faEllipsisH}
                iconSize={1}
                color="inherit"
                title="Handlinger"
                onClick={handleOpen}
            />
        </Stack>
    );
}

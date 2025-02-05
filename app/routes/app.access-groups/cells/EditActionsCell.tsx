import { Stack, useTheme } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid-pro";
import { useRowState } from "../hooks/useRowState";
import { Action } from "~/src/design-system";
import { IconCheck, IconX } from "@tabler/icons-react";

interface Props
    extends Pick<
        ReturnType<typeof useRowState>,
        "handleSaveClick" | "handleCancelClick"
    > {
    id: GridRowId;
}

export default function EditActionsCell({
    id,
    handleSaveClick,
    handleCancelClick,
}: Props) {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" spacing={0.5}>
            <Action.Symbol
                icon={IconCheck}
                symbolProps={{ color: theme.palette.success.main }}
                iconSize={1}
                color="inherit"
                title="Gem"
                onClick={handleSaveClick(id)}
            />
            <Action.Symbol
                icon={IconX}
                symbolProps={{ color: theme.palette.error.main }}
                iconSize={1}
                color="inherit"
                title="Annuller"
                onClick={handleCancelClick(id)}
            />
        </Stack>
    );
}

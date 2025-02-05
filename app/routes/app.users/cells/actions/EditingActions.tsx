import { Stack, useTheme } from "@mui/material";
import { Action } from "~/src/design-system";
import { ActionsCellProps } from "./ActionsCell";
import { IconCheck, IconX } from "@tabler/icons-react";

export type EditingActionsProps = Pick<
    ActionsCellProps,
    "handleSaveClick" | "handleCancelClick" | "id"
>;

export default function EditingActions({
    handleSaveClick,
    handleCancelClick,
    id,
}: EditingActionsProps) {
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

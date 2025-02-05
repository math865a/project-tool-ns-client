import { TeamMemberJson } from "gantt/types";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Action } from "~/src/design-system";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function AddMenuActions({
    selected,
    handleConfirm,
    handleCancel,
}: {
    selected: TeamMemberJson[];
    handleConfirm: () => void;
    handleCancel: () => void;
}) {
    const theme = useTheme();

    return (
        <Box
            flexGrow={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={1}
        >
            <Typography fontSize={12}>{selected.length + " valgte"}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Action.TextButton
                    text="Annuller"
                    icon={IconX}
                    sx={{ color: theme.palette.error.main }}
                    onClick={handleCancel}
                />
                <Action.TextButton
                    text="Tilføj"
                    disabled={selected.length === 0}
                    icon={IconCheck}
                    sx={{ color: theme.palette.success.main }}
                    onClick={handleConfirm}
                />
            </Stack>
        </Box>
    );
}

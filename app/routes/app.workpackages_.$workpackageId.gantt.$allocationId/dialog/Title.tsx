import { Box, DialogTitle, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { Allocation } from "gantt-models";
import { IconX } from "@tabler/icons-react";

export const Title = observer(
    ({
        Allocation,
        handleClose,
    }: {
        Allocation: Allocation;
        handleClose: () => void;
    }) => {
        return (
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" flexGrow={1}>
                    <Stack>
                        <Typography fontSize={16} fontWeight="bold">
                            {`Allokering for ${Allocation.Assignment?.TeamMember?.resource?.name}`}
                        </Typography>
                        <Typography>
                            {Allocation.Assignment?.Task?.name}
                        </Typography>
                    </Stack>
                    <Box>
                        <Action.Symbol
                            icon={IconX}
                            title="Luk"
                            onClick={handleClose}
                        />
                    </Box>
                </Box>
            </DialogTitle>
        );
    }
);

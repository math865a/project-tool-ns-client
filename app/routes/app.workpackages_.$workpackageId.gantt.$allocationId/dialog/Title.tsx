import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Box, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "@remix-run/react";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { Allocation } from "gantt-models";

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
                        icon={faTimes}
                        title="Luk"
                        onClick={handleClose}
                    />    
                    </Box>
            
                </Box>
            </DialogTitle>
        );
    }
);

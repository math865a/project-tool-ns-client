import { Box, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { CapacityView } from "~/pages/capacity/_models";
import { Action } from "~/src/design-system";
import { IconPencil } from "@tabler/icons-react";

const ViewItemDisplay = observer(
    ({
        CapacityView,
        updateIsEditing,
        isHovering,
    }: {
        CapacityView: CapacityView;
        updateIsEditing: () => void;
        isHovering: boolean;
    }) => {
        return (
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontSize={13} color="text.primary">
                    {CapacityView.name}
                </Typography>

                <Box>
                    {isHovering && (
                        <Action.Symbol
                            onClick={updateIsEditing}
                            icon={IconPencil}
                            iconSize={0.9}
                            title="Rediger navn"
                        />
                    )}
                </Box>
            </Stack>
        );
    }
);

export default ViewItemDisplay;

import { Button, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Symbol } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { useBoard } from "../../../_provider";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const ViewsAction = observer(
    ({
        handleOpen,
        open,
    }: {
        handleOpen: ReturnType<typeof useMenuState>["handleOpen"];
        open: boolean;
    }) => {
        const { View } = useBoard();
        return (
            <Button
                variant="text"
                sx={{ color: "initial" }}
                onClick={handleOpen}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Symbol icon={open ? IconChevronUp : IconChevronDown} />
                    <Typography>
                        {View.CapacityView?.name ?? "Standardvisning"}
                    </Typography>
                </Stack>
            </Button>
        );
    }
);

export default ViewsAction;

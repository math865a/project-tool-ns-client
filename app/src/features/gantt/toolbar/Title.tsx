import { Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useGantt } from "useGantt";
import { useWorkpackage } from "useWorkpackage";

export const Title = observer(() => {
    const { details } = useWorkpackage();
    const Gantt = useGantt();
    return (
        <Stack>
            <Typography fontSize={15} fontWeight="bold">
                Projektplan
            </Typography>
            <Typography fontSize={14} color="text.secondary">
                {details.systematicName}
            </Typography>
        </Stack>
    );
});

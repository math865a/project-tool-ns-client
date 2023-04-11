import { Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useGantt } from "useGantt";

export const PlanWork = observer(() => {
    const {
        Analysis: { PlanTotals: T },
    } = useGantt();
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Stack alignItems="flex-end">
                <Typography fontSize={12}>Arbejde:</Typography>
                <Typography fontSize={12}>Arbejde/dag:</Typography>
            </Stack>
            <Stack>
                <Typography color="text.secondary" fontSize={12}>
                    {T.workHours}
                </Typography>
                <Typography color="text.secondary" fontSize={12}>
                    {T.dailyWork}
                </Typography>
            </Stack>
        </Stack>
    );
});

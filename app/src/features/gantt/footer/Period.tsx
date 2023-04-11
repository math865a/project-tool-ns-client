import { Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useGantt } from "useGantt";

export const PlanPeriod = observer(() => {
    const {
        Analysis: { PlanTotals: T },
    } = useGantt();

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Stack alignItems="flex-end">
                <Typography fontSize={12}>Startdato:</Typography>
                <Typography fontSize={12}>Slutdato:</Typography>
            </Stack>
            <Stack>
                <Typography color="text.secondary" fontSize={12}>
                    {T.start}
                </Typography>
                <Typography color="text.secondary" fontSize={12}>
                    {T.end}
                </Typography>
            </Stack>
        </Stack>
    );
});

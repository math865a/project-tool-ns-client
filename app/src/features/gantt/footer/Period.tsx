import { Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useGantt } from "useGantt";

export const PlanPeriod = observer(() => {
    const {
        Store: {
            ActivityStore: { Plan },
        },
    } = useGantt();

    if (!Plan) return null;

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Stack alignItems="flex-end">
                <Typography fontSize={12}>Startdato:</Typography>
                <Typography fontSize={12}>Slutdato:</Typography>
            </Stack>
            <Stack>
                <Typography color="text.secondary" fontSize={12}>
                    {Plan.Interval.display.dates.long.start}
                </Typography>
                <Typography color="text.secondary" fontSize={12}>
                    {Plan.Interval.display.dates.long.end}
                </Typography>
            </Stack>
        </Stack>
    );
});

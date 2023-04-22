import { Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useGantt } from "useGantt";

export const PlanDays = observer(() => {
    const {
        Store: {ActivityStore},
    } = useGantt();

    if (!ActivityStore.Plan) return null;

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Stack alignItems="flex-end">
                <Typography fontSize={12}>Arbejdsdage:</Typography>
                <Typography fontSize={12}>Dage:</Typography>
            </Stack>
            <Stack>
                <Typography color="text.secondary" fontSize={12}>
                    {ActivityStore.Plan.Interval.counts.workDays}
                </Typography>
                <Typography color="text.secondary" fontSize={12}>
                    {ActivityStore.Plan.Interval.counts.days}
                </Typography>
            </Stack>
        </Stack>
    );
});

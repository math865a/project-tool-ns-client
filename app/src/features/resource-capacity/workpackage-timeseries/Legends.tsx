import { Stack, useTheme } from "@mui/material";
import { Chart } from "~/src/design-system";
import { useCapacityCharts } from "../_state";

export default function TimeseriesLegends() {
    const {
        activeWorkpackage: { activeWorkpackage },
    } = useCapacityCharts();

    const theme = useTheme();
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Chart.Legend
                r={10}
                title="Kapacitet"
                color={theme.palette.error.main}
                variant="line"
            />
            <Chart.Legend
                title={activeWorkpackage.systematicName}
                color={activeWorkpackage.color}
                variant="square"
            />
            <Chart.Legend
                title="Andre arbejdspakker"
                color="#1c1c1c"
                variant="square"
            />
        </Stack>
    );
}

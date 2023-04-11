import { Stack, useTheme } from "@mui/material";
import { Chart } from "~/src/design-system";

export default function BookingTypeLegends() {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Chart.Legend
                r={10}
                title="Kapacitet"
                color={theme.palette.error.main}
                variant="line"
            />
            <Chart.Legend r={7} title="Soft" color="#95A4FCB3" key="Soft" variant="square" />
            <Chart.Legend r={7} title="Hard" color="#A1E3CBB3" key="Hard" variant="square"  />
        </Stack>
    );
}

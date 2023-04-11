import { Stack } from "@mui/material";
import { Chart } from "~/src/design-system";

export default function CapcityDifferenceLegends() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Chart.Legend
                title="Tilgængelig"
                color="#A1E3CBB3"
                variant="square"
            />
            <Chart.Legend title="Overbooket" color="#FF4747B3" variant="square" />
        </Stack>
    );
}

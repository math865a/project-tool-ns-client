import { useTheme } from "@mui/material";
import { TooltipProps } from "recharts";
import { Chart } from "~/src/design-system";
import { ICapacityDifferenceData } from "../_state/useCapacityDifferenceData";

export default function CapacityDifferenceTooltip({
    active,
    payload,
}: TooltipProps<any, any>) {
    const theme = useTheme();

    const data =
        Chart.Tooltip.useRechartsTooltipData<ICapacityDifferenceData>(payload);

    const { displayInterval, weekYear } =
        Chart.Tooltip.useWeekYearToDisplayDate({
            week: data?.week,
            year: data?.year,
        });

    if (!data || !active) return null;
    return (
        <Chart.Tooltip.Wrapper
            title={weekYear}
            subtitle={displayInterval}
            suffix="t"
        >
            <Chart.Tooltip.Entry
                title="Booket"
                value={data.booked ? Number(data.booked.toFixed(1)) : 0}
            />
            <Chart.Tooltip.Entry title="Kapacitet" value={data.capacity} />
            <Chart.Tooltip.Divider />
            <Chart.Tooltip.Entry
                title="Difference"
                variant="square"
                color={data.diff > 0 ? "#A1E3CB" : "#FF4747"}
                value={Number(data.diff.toFixed(1))}
            />
        </Chart.Tooltip.Wrapper>
    );
}

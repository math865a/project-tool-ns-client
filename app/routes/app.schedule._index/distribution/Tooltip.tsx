import { useTheme } from "@mui/material";
import { TooltipProps } from "recharts";
import { ITask } from "~/src";
import { Chart } from "~/src/design-system";

export function TaskDistributionTooltip({
    active,
    payload,
}: TooltipProps<any, any>) {
    const theme = useTheme();

    const data =
        Chart.Tooltip.useRechartsTooltipData<ITask>(payload);

    if (!data || !active) return null;
    return (
        <Chart.Tooltip.Wrapper
            title={data.title}
            subtitle={data.workpackage.systematicName}
            maxWidth={300}
            valueWidth={100}
        >
            <Chart.Tooltip.Entry title="Startdato" value={data.display.period.start} hideSign/>
            <Chart.Tooltip.Entry title="Slutdato" value={data.display.period.end} hideSign/>
            <Chart.Tooltip.Entry title="Timer" value={data.work} hideSign/>
            <Chart.Tooltip.Entry title="Arbejdsdage" value={data.workDays} hideSign/>

        </Chart.Tooltip.Wrapper>
    );
}

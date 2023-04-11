import { TooltipProps } from "recharts";
import { Chart } from "~/src/design-system";
import { IWorkpackageTotalsData } from "../_state/useWorkpackageChartsData";

export default function TotalsTooltip({
    active,
    payload,
}: TooltipProps<any, any>) {
    const data =
        Chart.Tooltip.useRechartsTooltipData<IWorkpackageTotalsData>(payload);

    if (!data || !active) return null;
    return (
        <Chart.Tooltip.Wrapper title=" " suffix="timer" valueWidth={70}>
            <Chart.Tooltip.Entry
                title={data?.systematicName}
                color={data?.color}
                value={data?.booked}
                hideSign
                fontSize={13}
            />
        </Chart.Tooltip.Wrapper>
    );
}

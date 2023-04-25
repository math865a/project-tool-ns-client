import { TooltipProps } from "recharts";
import { Chart } from "~/src/design-system";


export default function DeliveryTooltip({
    active,
    payload,
}: TooltipProps<any, any>) {
    const data =
        Chart.Tooltip.useRechartsTooltipData<any>(payload);

    if (!data || !active) return null;
    return (
        <Chart.Tooltip.Wrapper
            title={data.name}
            subtitle={data.displayInterval}
        >
            <></>
        </Chart.Tooltip.Wrapper>
    );
}

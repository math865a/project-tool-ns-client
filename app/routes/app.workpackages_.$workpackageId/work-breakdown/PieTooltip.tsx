import { Chart } from "design";
import { observer } from "mobx-react-lite";
import { TooltipProps } from "recharts";
import { ITeamPieData } from "~/src/features";



export const PieTooltip = observer(({payload,active}: TooltipProps<any, any>) => {

    const data = Chart.Tooltip.useRechartsTooltipData<ITeamPieData>(payload)

    if (!data || !active) return null;

    return(
        <Chart.Tooltip.Wrapper title={data.name} valueWidth={40}>
            <Chart.Tooltip.Entry  title="Arbejde" value={data.work} suffix="t" hideSign/>
            <Chart.Tooltip.Entry  title="Andel af total" value={data.percent} suffix="%" hideSign/>
        </Chart.Tooltip.Wrapper>
    )
});

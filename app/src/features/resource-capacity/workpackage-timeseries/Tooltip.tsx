import _ from "lodash";
import { useMemo } from "react";
import { TooltipProps } from "recharts";
import { Chart } from "~/src/design-system";
import { useCapacityCharts } from "../_state";
import {
    IWorkpackageTimeseriesData,
} from "../_state/useWorkpackageChartsData";

export function TimeseriesTooltip({
    active,
    payload
}: TooltipProps<any, any>) {

    const {activeWorkpackage: {activeWorkpackage}} = useCapacityCharts()

    const data =
        Chart.Tooltip.useRechartsTooltipData<IWorkpackageTimeseriesData>(
            payload
        );
    const { displayInterval, weekYear } =
        Chart.Tooltip.useWeekYearToDisplayDate({
            week: data?.week,
            year: data?.year,
        });

    const dataKeys = useMemo(() => {
        return _.omit(data, ["week", "year"]);
    }, [data]);

    const otherTotal = useMemo(() => {
        return (
            _.sum(
                _.values(
                    _.filter(
                        dataKeys,
                        (v, k) => k !== activeWorkpackage.systematicName
                    )
                )
            ) ?? 0
        );
    }, [dataKeys, activeWorkpackage]);

    const focalTotal = useMemo(() => {
        if (!activeWorkpackage) return 0;
        return dataKeys[activeWorkpackage.systematicName] ?? 0;
    }, [dataKeys, activeWorkpackage]);

    if (!data || !active) return null;

    return (
        <Chart.Tooltip.Wrapper title={weekYear} subtitle={displayInterval} suffix="t">
            <Chart.Tooltip.Entry
                title="Kapacitet"
                color="#FB3640"
                value={8 * 5}
                variant="line"
            />
            <Chart.Tooltip.Divider />
            <Chart.Tooltip.Entry
                title={activeWorkpackage.systematicName}
                color={activeWorkpackage.color}
                value={_.round(focalTotal, 1)}
                variant="square"
                underline
             
            />
            <Chart.Tooltip.Entry
                title="Andre"
                color="#1c1c1c"
                variant="square"
                value={_.round(otherTotal, 1)}
            />
            <Chart.Tooltip.Entry
                title="Booket totalt"
                value={_.round(focalTotal + otherTotal, 1)}
                bold
         
            />
            <Chart.Tooltip.Divider />

            <Chart.Tooltip.Entry
                title="Difference"
                value={_.round(8 * 5 - (focalTotal + otherTotal), 1)}
            />
        </Chart.Tooltip.Wrapper>
    );
}

import { useTheme } from "@mui/material";
import { TooltipProps } from "recharts";
import { Chart } from "~/src/design-system";
import { IBookingTypeData } from "../_state/useBookingTypeData";

export default function BookingTypeTooltip({
    active,
    payload,
}: TooltipProps<any, any>) {
    const data =
        Chart.Tooltip.useRechartsTooltipData<IBookingTypeData>(payload);

    const { displayInterval, weekYear } =
        Chart.Tooltip.useWeekYearToDisplayDate({
            week: data?.week,
            year: data?.year,
        });
    const theme = useTheme();
    if (!data || !active) return null;
    return (
        <Chart.Tooltip.Wrapper
            title={weekYear}
            subtitle={displayInterval}
            suffix="t"
        >
            <Chart.Tooltip.Entry
                title="Kapacitet"
                color={theme.palette.error.main}
                variant="line"
                value={data.capacity}
            />
            <Chart.Tooltip.Divider />
            <Chart.Tooltip.Entry
                title="Soft"
                color="#AF74E7"
                variant="square"
                value={data.Soft ? Number(data.Soft.toFixed(1)) : 0}
            />
            <Chart.Tooltip.Entry
                title="Hard"
                color="#95A4FC"
                variant="square"
                value={data.Hard ? Number(data.Hard.toFixed(1)) : 0}
            />

            <Chart.Tooltip.Entry
                title="Booket totalt"
                value={Number(((data.Hard ?? 0) + (data.Soft ?? 0)).toFixed(1))}
            />
            <Chart.Tooltip.Divider />
            <Chart.Tooltip.Entry
                title="Difference"
                value={Number(
                    (
                        data.capacity -
                        (data.Hard ?? 0) -
                        (data.Soft ?? 0)
                    ).toFixed(1)
                )}
            />
        </Chart.Tooltip.Wrapper>
    );
}

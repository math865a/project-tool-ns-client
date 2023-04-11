import { useTheme } from "@mui/material";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Fallback } from "~/src/design-system";
import { useCapacityCharts } from "../_state";
import BookingTypeTooltip from "./Tooltip";

export function BookingTypeChart() {
    const {
        bookingType: { isLoading, data, isEmpty },
    } = useCapacityCharts();

    const theme = useTheme();

    if (isLoading) {
        return <Fallback.SectionLoading />;
    }
    if (isEmpty) {
        return <Fallback.Empty />;
    }

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <ComposedChart data={data}>
                <CartesianGrid vertical={false} stroke="rgba(0, 0, 0, 0.05)" />
                <XAxis
                    dataKey="week"
                    tickFormatter={(d) => "U" + d}
                    dy={5}
                    fontSize={12}
                    fill={theme.palette.text.secondary}
                    tickLine={{ strokeWidth: 0 }}
                    axisLine={{ stroke: "transparent" }}
                    tickCount={8}
                    minTickGap={25}
                    type="category"
                    ticks={data.map((d) => d.week)}
                />
                <YAxis
                    interval="preserveStartEnd"
                    //domain={[0, Math.ceil(yMax)]}
                    unit="t"
                    allowDecimals={false}
                    tickCount={4}
                    fontSize={12}
                    fill={theme.palette.text.secondary}
                    dx={-5}
                    tickLine={{ strokeWidth: 0.5, stroke: "#CECECE" }}
                    axisLine={{ stroke: "transparent" }}
                />
                <Bar
                    stackId="1"
                    dataKey="Hard"
                    opacity={0.7}
                    fill="#A1E3CB"
                    maxBarSize={40}
                />
                <Bar
                    stackId="1"
                    dataKey="Soft"
                    fill="#95A4FC"
                    opacity={0.7}
                    maxBarSize={40}
                />
                <Line
                    dataKey="capacity"
                    stroke={theme.palette.error.main}
                    dot={false}
                    isAnimationActive={false}
                />
                <Tooltip
                    allowEscapeViewBox={{ x: false, y: true }}
                    wrapperStyle={{
                        outline: "none",
                        borderColor: "transparent",
                    }}
                    content={(props) => <BookingTypeTooltip {...props} />}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

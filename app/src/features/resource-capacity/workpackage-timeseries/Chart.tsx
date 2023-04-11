import { useTheme } from "@mui/material";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useCapacityCharts } from "../_state";
import { TimeseriesTooltip } from "./Tooltip";

export function WorkpackageTimeseriesChart() {
    const {
        workpackage: { timeseries, totals },
        activeWorkpackage: { activeWorkpackage },
    } = useCapacityCharts();

    const theme = useTheme();

    return (
        <ResponsiveContainer width="100%" aspect={3.25}>
            <ComposedChart data={timeseries}>
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
                    ticks={timeseries.map((d) => d.week)}
                />
                <YAxis
                    //domain={[0, yMax]}
                    interval="preserveStartEnd"
                    tickFormatter={(d) => d + "t"}
                    fontSize={12}
                    fill={theme.palette.text.secondary}
                    dx={-5}
                    tickLine={{ strokeWidth: 0.5, stroke: "#CECECE" }}
                    axisLine={{ stroke: "transparent" }}
                />
                {totals.map((total, index) => (
                    <Bar
                        maxBarSize={40}
                        dataKey={total.systematicName}
                        key={total.id}
                        stackId={1}
                        fill={
                            total.id === activeWorkpackage.id
                                ? activeWorkpackage.color
                                : "rgba(0,0,0,0.8)"
                        }
                    />
                ))}

                <Line
                    dataKey="capacity"
                    stroke={theme.palette.error.main}
                    dot={false}
                    isAnimationActive={false}
                />

                <Tooltip
                    allowEscapeViewBox={{ x: false, y: false }}
                    offset={30}
                    wrapperStyle={{
                        outline: "none",
                        borderColor: "transparent",
                    }}
                    content={(props) => <TimeseriesTooltip {...props} />}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

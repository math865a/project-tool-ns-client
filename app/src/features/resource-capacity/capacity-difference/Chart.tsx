import { useTheme } from "@mui/material";
import _ from "lodash";
import { useMemo } from "react";
import {
    Bar,
    CartesianGrid,
    Cell,
    ComposedChart,
    Line,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Fallback } from "~/src/design-system";
import { useCapacityCharts } from "../_state";
import CapacityDifferenceTooltip from "./Tooltip";

export function CapacityDifferenceChart() {
    const {
        capacityDifference: { data, isLoading },
    } = useCapacityCharts();

    const dataMin = useMemo(() => {
        return Math.min(
            Math.floor(_.minBy(data, (d) => d.diff)?.diff ?? 0),
            -10
        );
    }, [data]);

    const dataMax = useMemo(() => {
        return Math.max(Math.ceil(_.maxBy(data, (d) => d.diff)?.diff ?? 0), 10);
    }, [data]);

    const domain = useMemo(() => {
        return Math.max(Math.abs(dataMin), Math.abs(dataMax), 40);
    }, [dataMin, dataMax]);

    const theme = useTheme();

    if (isLoading) return <Fallback.SectionLoading />;

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <ComposedChart
                data={data}
                height={250}
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis
                    dataKey="week"
                    dy={5}
                    fontSize={12}
                    tickCount={8}
                    minTickGap={25}
                    fill={theme.palette.text.secondary}
                    tickLine={{ strokeWidth: 0 }}
                    axisLine={{ stroke: "transparent" }}
                    tickFormatter={(d) => "U" + d}
                />
                <YAxis
                    domain={[-domain, domain]}
                    ticks={[-domain, -domain / 2, 0, domain / 2, domain]}
                    // padding={{ top: 5, bottom: 5 }}
                    tickFormatter={(d) => d + "t"}
                    fontSize={12}
                    fill={theme.palette.text.secondary}
                    dx={-5}
                    tickLine={{ strokeWidth: 0.5, stroke: "#CECECE" }}
                    axisLine={{ stroke: "transparent" }}
                />

                <Bar
                    maxBarSize={40}
                    dataKey="diff"
                    stroke={"transparent"}
                    strokeWidth={1}
                    fill="#c6c7f8"
                >
                    {data.map((d) => (
                        <Cell
                            key={d.week + "-" + d.year}
                            fill={d.diff > 0 ? "#A1E3CB" : "#FF4747"}
                            opacity={0.7}
                        />
                    ))}
                </Bar>

                <ReferenceLine y={0} strokeOpacity={0.7} stroke={"#1c1c1c"} />
                <ReferenceLine y={40} strokeOpacity={0.5} stroke={"#1c1c1c"} strokeDasharray="4 4"/>
                <Tooltip
                    allowEscapeViewBox={{ x: false, y: true }}
                    wrapperStyle={{
                        outline: "none",
                        borderColor: "transparent",
                    }}
                    content={(props) => (
                        <CapacityDifferenceTooltip {...props} />
                    )}
                />
                <Line dataKey="diff" stroke="transparent" dot={false} />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

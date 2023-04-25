import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useGantt } from "~/src/features";
import { formatDecimal } from "~/util";
import { DateTime as dt } from "luxon";
import { useTheme } from "@mui/material";

export const WorkLoadChart = observer(({width, height}: {width: number, height: number}) => {
    const {
        Store: {
            ActivityStore: { Plan },
        },
    } = useGantt();

    const theme = useTheme();

    if (!Plan) return null;

    return (
        <ResponsiveContainer width={width} aspect={2.5}>
            <LineChart
                data={Plan.Work.dayWork}
                margin={{ left: 0, top: 10, right: 0, bottom: 10 }}
            >
                <XAxis
                    interval="preserveStartEnd"
                    dataKey="date"
                    dy={10}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(d) => ""}
                    tickLine={false}
                    axisLine={{ stroke: theme.palette.divider }}
                    hide
                />
                <YAxis
                domain={["dataMin", "dataMax"]}
                    interval="preserveStartEnd"
                    tickFormatter={(d) => formatDecimal(_.round(Number(d), 2))}
                    width={50}
                    unit="t"
                    tick={{
                        fontSize: 11,
                        fontVariant: "tabular-nums",
                        letterSpacing: 0.3,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: "transparent" }}
                    hide
                />
                <Line
                    type="monotone"
                    dataKey="work"
                    stroke="#000"
                    dot={false}
                    connectNulls={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
});

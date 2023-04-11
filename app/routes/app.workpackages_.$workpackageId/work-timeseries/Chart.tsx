import { TeamMember } from "gantt-models";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useWorkpackage } from "~/src/state";
import { formatDecimal } from "~/util/format";
import WorkTimeseriesTooltip from "./Tooltip";

export const TeamWorkTimeseriesChart = observer(() => {
    const {
        Gantt: {
            Analysis: { WorkTimeseries: WOS },
            TeamStore,
        },
    } = useWorkpackage();

    const RenderChart = ({ TeamMember }: { TeamMember: TeamMember }) => {
        if (WOS.weeks.length > 70) {
            return (
                <Area
                    stackId="1"
                    dataKey={TeamMember.id}
                    key={TeamMember.id}
                    fill={TeamMember.resource.color}
                    stroke={TeamMember.resource.color}
                    type="monotone"
                />
            );
        }
        return (
            <Bar
                stackId="1"
                dataKey={TeamMember.id}
                key={TeamMember.id}
                fill={TeamMember.resource.color}
                stroke={TeamMember.resource.color}
                maxBarSize={75}
            />
        );
    };

    return (
        <ResponsiveContainer width="100%" aspect={4}>
            <ComposedChart
                data={WOS.data}
                margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
            >
                <CartesianGrid vertical={false} stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis
                    dataKey="week"
                    minTickGap={10}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(d) => "U" + d}
                    tickLine={false}
                    axisLine={{ stroke: "transparent" }}
                />
                <YAxis
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
                />
                {TeamStore.TeamMembers.map((TeamMember) =>
                    RenderChart({ TeamMember })
                )}
                <Line dataKey="totalWork" stroke="transparent" dot={false} />
                <Tooltip
                    offset={30}
                    allowEscapeViewBox={{ x: true, y: false }}
                    wrapperStyle={{
                        outline: "none",
                        borderColor: "transparent",
                    }}
                    content={(props) => <WorkTimeseriesTooltip {...props} />}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
});

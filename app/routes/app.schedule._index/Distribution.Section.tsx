import {
    Cell,
    Label,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Page } from "~/src/design-system";
import { useSummary } from "./_state";
import { TaskDistributionTooltip } from "./distribution";

export default function DistributionSection() {
    const { tasks, workpackages } = useSummary();

    return (
        <Page.Section title="Opgavefordeling" xs={4} overflowX overflowY>
            <ResponsiveContainer width="100%" aspect={1.4}>
                <PieChart margin={{ left: 10, top: 10, right: 10, bottom: 10 }}>
                    <Pie
                        data={tasks}
                        dataKey="work"
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                        nameKey="name"
                        innerRadius={"70%"}
                        outerRadius={"100%"}
                        isAnimationActive={false}
                        focusable={false}
                        stroke={"transparent"}
                        style={{ borderColor: "transparent", outline: "none" }}
                        paddingAngle={1}
                    >
                        {tasks.map((d, i) => (
                            <Cell
                                key={d.id}
                                fill={
                                    workpackages.find(
                                        (x) => x.id === d.workpackage.id
                                    )?.color ?? d.color
                                }
                                style={{
                                    borderColor: "transparent",
                                    stroke: "transparent",
                                    outline: "none",
                                }}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        allowEscapeViewBox={{ x: false, y: true }}
                        wrapperStyle={{
                            outline: "none",
                            borderColor: "transparent",
                        }}
                        content={(props) => (
                            <TaskDistributionTooltip {...props} />
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Page.Section>
    );
}

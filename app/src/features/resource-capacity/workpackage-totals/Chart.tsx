import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useCapacityCharts } from "../_state";
import PieActiveLabel from "./PieActiveLabel";
import TotalsTooltip from "./Tooltip";

export function WorkpackageTotalsChart() {
    const {
        activeWorkpackage: { active, updateActive },
        workpackage: { totals },
    } = useCapacityCharts();

    return (
        <ResponsiveContainer width="100%" aspect={1.4}>
            <PieChart margin={{ left: 10, top: 10, right: 10, bottom: 10 }}>
                <Pie
                    data={totals}
                    dataKey="booked"
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    nameKey="name"
                    innerRadius={"50%"}
                    activeShape={PieActiveLabel}
                    onClick={(e, index) => updateActive(index)}
                    activeIndex={active}
                    isAnimationActive={false}
                    focusable={false}
                    stroke={"transparent"}
                    style={{ borderColor: "transparent", outline: "none" }}
                >
                    {totals.map((d, i) => (
                        <Cell
                            key={d.systematicName}
                            fill={d.color}
                            style={{
                                cursor: "pointer",
                                borderColor: "transparent",
                                stroke: "transparent",
                                outline: "none",
                            }}
                        />
                    ))}
                </Pie>
                <Tooltip
                    allowEscapeViewBox={{ x: true, y: true }}
                    wrapperStyle={{
                        outline: "none",
                        borderColor: "transparent",
                    }}
                    content={(props) => <TotalsTooltip {...props} />}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

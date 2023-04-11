import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Fallback } from "~/src/design-system";
import { useWorkpackage } from "~/src/state";
import { PieLabel } from "./PieLabel";
import { PieTooltip } from "./PieTooltip";

export const TeamPie = observer(() => {
    const {
        Gantt: {
            Analysis: { TotalTeamWork: Analysis, PlanningChart },
        },
    } = useWorkpackage();

    return (
        <Box
            flexGrow={1}
            height={PlanningChart.maxHeight + PlanningChart.footerHeight}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {Analysis.isEmpty ? (
                <Fallback.Empty />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={Analysis.data}
                            dataKey="work"
                            cx="50%"
                            cy="50%"
                            outerRadius="100%"
                            innerRadius="50%"
                            labelLine={false}
                            label={PieLabel}
                        >
                            {Analysis.data.map((t) => (
                                <Cell key={t.id} fill={t.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            reverseDirection={{ x: true }}
                            wrapperStyle={{
                                outline: "none",
                                borderColor: "transparent",
                            }}
                            allowEscapeViewBox={{ x: false, y: true }}
                            content={(props) => <PieTooltip {...props} />}
                        />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
});

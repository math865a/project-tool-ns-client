import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Fallback } from "~/src/design-system";
import { useWorkpackage } from "~/src/state";
import { PieLabel } from "./PieLabel";
import { PieTooltip } from "./PieTooltip";
import { computed } from "mobx";
import _ from "lodash";

export interface ITeamPieData {
    id: string;
    name: string;
    work: number;
    color: string;
    percent: number;
}


export const TeamPie = observer(() => {
    const {Gantt} = useWorkpackage();

    const totalWork = computed(() => {
        return Gantt.Store.ActivityStore.Plan?.Work.work.total ?? 0
    })
 
    const data = computed(() => {
        return Gantt.Store.TeamStore.TeamMembers.filter(d => d.workStats.timesheet.total > 0).map(t => ({
            id: t.id,
            name: t.Resource.name,
            work: t.workStats.timesheet.total,
            color: t.Resource.color,
            percent: _.round((t.workStats.timesheet.total / totalWork.get()),2) * 100
        }))
    })

    return (
        <Box
            flexGrow={1}
            height={300}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {totalWork.get() === 0 ? (
                <Fallback.Empty />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data.get()}
                            dataKey="work"
                            cx="50%"
                            cy="50%"
                            outerRadius="100%"
                            innerRadius="50%"
                            labelLine={false}
                            label={PieLabel}
                        >
                            {data.get().map((t) => (
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

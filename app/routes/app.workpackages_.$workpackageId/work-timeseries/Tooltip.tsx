import { Chart } from "design";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { TooltipProps } from "recharts";
import { useWorkpackage } from "~/src/state";

const WorkTimeseriesTooltip = observer(
    ({ active, payload }: TooltipProps<any, any>) => {
        const data =
            Chart.Tooltip.useRechartsTooltipData<any>(
                payload
            );

        const { weekYear, displayInterval } =
            Chart.Tooltip.useWeekYearToDisplayDate({
                week: data?.week,
                year: data?.year,
            });

        const {
            Gantt: { TeamStore },
        } = useWorkpackage();

        const tooltipData = _.filter(
            _.map(TeamStore.TeamMembers, (TeamMember) => ({
                TeamMember: TeamMember,
                work: Math.abs((data ? data[TeamMember.id] : 0) ?? 0),
            })),
            (d) => d.work > 0
        );

        if (!data || !active || tooltipData.length === 0) return null;

        return (
            <Chart.Tooltip.Wrapper
                title={weekYear}
                subtitle={displayInterval}
                suffix="t"
                valueWidth={40}
            >
                <>
                    {tooltipData.map((d) => (
                        <Chart.Tooltip.Entry
                            key={d.TeamMember.id}
                            color={d.TeamMember.resource.color}
                            title={d.TeamMember.resource.name}
                            subtitle={d.TeamMember.resourceType.name}
                            textColor="text.primary"
                            subtitleTextColor="text.secondary"
                            fontSize={11}
                            value={d.work}
                            variant="square"
                            hideSign
                        />
                    ))}
                    {tooltipData.length > 0 && <Chart.Tooltip.Divider />}
                    <Chart.Tooltip.Entry
                        title="Total"
                        value={_.round(data.totalWork, 1)}
                        hideSign
                    />
                </>
            </Chart.Tooltip.Wrapper>
        );
    }
);

export default WorkTimeseriesTooltip;

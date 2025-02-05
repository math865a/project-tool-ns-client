import { observer } from "mobx-react-lite";
import { Fallback, Page } from "~/src/design-system";
import GanttDialog from "./planning/GanttAction";
import PlanningChart from "./planning/PlanningChart";
import { useWorkpackage } from "~/src/state";
import { PlanningSectionFooter } from "./planning/Footer";
import { IconChartBarPopular } from "@tabler/icons-react";

const PlanningSection = observer(() => {
    const { Gantt } = useWorkpackage();

    return (
        <Page.Section
            title="Projektplan"
            xs={8}
            overflowX
            startActions={<GanttDialog />}
            endActions={<PlanningSectionFooter />}
        >
            {Gantt.isEmpty ? (
                <Fallback.Empty
                    text="Der er ikke oprettet nogle leverancer endnu."
                    icon={IconChartBarPopular}
                    direction="column"
                    iconSize={3}
                />
            ) : (
                <PlanningChart />
            )}
        </Page.Section>
    );
});

export default PlanningSection;

import { Fallback, Page } from "design";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "~/src/state";
import { TeamPie } from "./work-breakdown";

const WorkBreakdownsSection = observer(() => {
    const { Gantt } = useWorkpackage();
    return (
        <Page.Section title="Timefordeling" xs={4} overflowX overflowY>
            {Gantt.Table.Rows.length === 1 ? (
                <Fallback.Empty/>
            ) : (
                <TeamPie />
            )}
        </Page.Section>
    );
});

export default WorkBreakdownsSection;

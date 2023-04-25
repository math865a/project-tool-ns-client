import { Fallback, Page } from "design";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "~/src/state";
import { TeamWorkTimeseriesChart } from "./work-timeseries";


const WorkTimesseriesSection = observer(() => {
    const {
        Gantt: {
            Analysis: { WorkTimeseries: WOS },
        },
    } = useWorkpackage();

    return (
        <Page.Section title="Arbejde over tid" xs={12} overflowX overflowY>
            {WOS.isEmpty ? <Fallback.Empty /> : <TeamWorkTimeseriesChart />}
        </Page.Section>
    );
});

export default WorkTimesseriesSection;

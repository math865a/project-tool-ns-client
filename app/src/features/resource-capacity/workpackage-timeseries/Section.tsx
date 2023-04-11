import { Fallback, Page } from "~/src/design-system";
import TimeseriesLegends from "./Legends";
import { WorkpackageTimeseriesChart } from "./Chart";
import { useCapacityCharts } from "../_state";

export function WorkpackageTimeseriesSection() {
    const {
        workpackage: { isLoading },
        activeWorkpackage: { activeWorkpackage },
    } = useCapacityCharts();

    return (
        <Page.Section
            title="Arbejdspakkefordeling"
            xs={8}
            xxl={8}
            overflowX
            overflowY
            px={1}
            pxTitle={2}
            startActions={activeWorkpackage ? <TimeseriesLegends /> : null}
        >
            {!activeWorkpackage ? (
                <Fallback.Empty />
            ) : isLoading ? (
                <Fallback.SectionLoading />
            ) : (
                <WorkpackageTimeseriesChart />
            )}
        </Page.Section>
    );
}

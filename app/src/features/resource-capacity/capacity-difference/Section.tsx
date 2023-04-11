import { Page } from "~/src/design-system";
import {CapacityDifferenceChart} from "./Chart";
import CapacityDifferenceLegends from "./Legends";
export function CapacityDifferenceSection() {
    return (
        <Page.Section
            title="Kapacitetsdifference"
            xs={6}
            alignSelf="stretch"
            px={1}
            pxTitle={2}
            overflowX
            overflowY
            startActions={<CapacityDifferenceLegends />}
        >
            <CapacityDifferenceChart />
        </Page.Section>
    );
}

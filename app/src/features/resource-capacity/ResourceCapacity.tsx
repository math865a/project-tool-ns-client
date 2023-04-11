import { SocketProvider } from "~/src";
import { ResourceCapacityProvider } from "./_state";
import { BookingTypeSection } from "./bookingtype";
import { CapacityDifferenceSection } from "./capacity-difference";
import { ResourceCapacityHeader } from "./dateRange";
import { WorkpackageTasksSection } from "./workpackage-tasks";
import { WorkpackageTimeseriesSection } from "./workpackage-timeseries";
import { WorkpackageTotalsSection } from "./workpackage-totals";

export function ResourceCapacity({ resourceId }: { resourceId: string }) {
    return (
        <SocketProvider namespace="resourceCapacity">
            <ResourceCapacityProvider resourceId={resourceId}>
               <ResourceCapacityHeader/>
                <CapacityDifferenceSection />
                <BookingTypeSection />
                <WorkpackageTotalsSection />
                <WorkpackageTimeseriesSection />
                <WorkpackageTasksSection />
            </ResourceCapacityProvider>
        </SocketProvider>
    );
}

import { createContext, useContext } from "react";
import { Child } from "~/src/design-system";

import { BookingStageBag, useBookingStage } from "./state/useBookingStage";
import { DetailsBag, useDetails } from "./state/useDetailsState";
import { useGanttModel } from "./state/useGanttModel";
import { ManagerBag, useManagers } from "./state/useManagers";
import { StageBag, useStage } from "./state/useStage";
import { Inform, useInform } from "~/src/design-system/feedback/info";
import { Gantt } from "~/src/features";

export interface IWorkpackageBag {
    bookingStage: BookingStageBag;
    stage: StageBag;
    managers: ManagerBag;
    Gantt: Gantt;
    details: DetailsBag;
    inform: ReturnType<typeof useInform>["inform"];
}

const WorkpackageContext = createContext<IWorkpackageBag | undefined>(
    undefined
);

export function WorkpackageProvider({
    children,
}: {
    children: Child | Child[];
}) {
    const bookingStage = useBookingStage();
    const stage = useStage();
    const managers = useManagers();
    const Gantt = useGanttModel();
    const details = useDetails();
    const {inform, informProps} = useInform()

    return (
        <WorkpackageContext.Provider
            value={{ bookingStage, stage, managers, Gantt, details, inform }}
        >
            {children}
            <Inform {...informProps} />
        </WorkpackageContext.Provider>
    );
}

export const useWorkpackage = () => {
    const ctx = useContext(WorkpackageContext);
    if (!ctx) throw new Error("No ctx");
    return ctx;
};

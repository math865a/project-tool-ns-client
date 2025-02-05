import { Child } from "design";
//import { TimelineWorkpackageJson }
import { registerRootStore } from "mobx-keystone";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useState } from "react";
import { TimelineController } from "./controllers/controller";

function createModel(workpackages: any[]) {
    const Controller = new TimelineController({});
    registerRootStore(Controller);
    Controller.Store.resolveMany(workpackages);
    return Controller;
}

const useTimelineController = (workpackages: any[]) => {
    const [Controller] = useState<TimelineController>(() =>
        createModel(workpackages)
    );
    return Controller;
};

const TaskTimelineContext = createContext<TimelineController | undefined>(
    undefined
);

const TimelineProvider = observer(
    ({
        children,
        workpackages,
    }: {
        children: Child | Child[];
        workpackages: any[];
    }) => {
        const Controller = useTimelineController(workpackages);

        return (
            <TaskTimelineContext.Provider value={Controller}>
                {children}
            </TaskTimelineContext.Provider>
        );
    }
);

export default TimelineProvider;

export const useTimeline = () => {
    const ctx = useContext(TaskTimelineContext);
    if (!ctx) {
        throw new Error("no ctx");
    }
    return ctx;
};

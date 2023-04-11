import { Child } from 'design';
import { ResourceProfile, TimelineWorkpackageJson } from '@math865a/project-tool.types';
import { registerRootStore } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { createContext, useContext, useState } from 'react';
import { TimelineController } from './controllers/controller';
import { useRouteLoaderData } from '@remix-run/react';

function createModel(workpackages: TimelineWorkpackageJson[]) {
    const Controller = new TimelineController({});
    registerRootStore(Controller);
    Controller.Store.resolveMany(workpackages);
    return Controller;
}

const useTimelineController = (workpackages: TimelineWorkpackageJson[]) => {
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
        workpackages: TimelineWorkpackageJson[];
    }) => {

        const Controller = useTimelineController(workpackages);

        return (
            <TaskTimelineContext.Provider value={Controller}>
                {children}
            </TaskTimelineContext.Provider>
        );
    }
);

export default TimelineProvider

export const useTimeline = () => {
    const ctx = useContext(TaskTimelineContext);
    if (!ctx) {
        throw new Error('no ctx');
    }
    return ctx;
};

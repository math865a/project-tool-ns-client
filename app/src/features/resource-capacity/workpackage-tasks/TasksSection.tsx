import { Fallback, Page } from "~/src/design-system";
import { useCapacityCharts } from "../_state";
import TasksGrid from "./TasksGrid";
import ProjectManagerDisplay from "./components/ProjectManagerDisplay";
import TasksSectionTitle from "./components/Title";
import ScaleProvider from "./provider/TimelineProvider";

export function WorkpackageTasksSection() {
    const {
        activeWorkpackage: {activeWorkpackage},
        workpackageTasks: { projectManager, isLoading },
    } = useCapacityCharts();

    return (
        <Page.Section
            xs={12}
            title={!activeWorkpackage ? "Opgaver" : activeWorkpackage && <TasksSectionTitle />}
            startActions={
              activeWorkpackage &&  <ProjectManagerDisplay projectManager={projectManager} />
            }
        >
            <ScaleProvider>
                {isLoading  ? (
                    <Fallback.SectionLoading height={400} />
                ) : !activeWorkpackage ? <Fallback.Empty/> : (
                    <TasksGrid />
                )}
            </ScaleProvider>
        </Page.Section>
    );
}

import { useDeadlines } from "./useDeadlines";
import { useTasks } from "./useTasks";
import { useWorkpackages } from "./useWorkpackages";

export const useSummaryState = () => {
    const taskProps = useTasks();
    const deadlineProps = useDeadlines(taskProps.tasks, taskProps.currentView);
    const workpackages = useWorkpackages(taskProps.tasks)
    return {
        deadline: deadlineProps,
        ...taskProps,
        workpackages
    };
};

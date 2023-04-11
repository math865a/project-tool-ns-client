import { ProjectManager } from "@math865a/project-tool.types";
import { useOptions } from "~/src/hooks/options/useOptions";
import { useOptionState } from "~/src/hooks/options/useOptionState";
import { HandleOptionsStageToggle } from "~/src/hooks/options/_types";
import { useLoaderData } from "@remix-run/react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId/route";

export const useManagers = () => {
    const {
        node: { id: recordId },
        managers: {
            projectManager: {id: initialProjectManager},
        }
    } = useLoaderData<WorkpackageLoader>();

    const handleToggle: HandleOptionsStageToggle<ProjectManager> = (
        value,
        currentValue,
        options
    ) => {
        if (!value || value.id === currentValue.id) {
            return options.find((d) => d.name === "Ingen") ?? null;
        }
        return value;
    };

    const optionProps = useOptions<ProjectManager>({
        loadMessage: "project-manager-options",
    });

    const projectManager = useOptionState<ProjectManager>({
        initialValue: initialProjectManager,
        persistMessage: "update-project-manager",
        options: optionProps.options,
        recordId,
        handleToggle,
    });

    return {
        projectManager,
        ...optionProps,
    };
};

export type ManagerBag = ReturnType<typeof useManagers>;

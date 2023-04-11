
import { useLoaderData } from "@remix-run/react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId/route";
import { Stage } from "~/src/_definitions";
import { useOptionState } from "~/src/hooks/options/useOptionState";

export const useStage = () => {
    const {
        foreignKeys: { stageId: initialValue },
        options: { stages: options },
        node: { id: recordId },
    } = useLoaderData<WorkpackageLoader>();
    const state = useOptionState<Stage>({
        persistMessage: "update:stage",
        recordId,
        options,
        initialValue,
        recordKey: "workpackageId",
        valueKey: "stage",
    });

    return {
        ...state,
        options: options,
    };
};

export type StageBag = ReturnType<typeof useStage>;

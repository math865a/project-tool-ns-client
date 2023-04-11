import { useLoaderData } from "@remix-run/react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId/route";
import { Stage } from "~/src/_definitions";
import { useOptionState } from "~/src/hooks/options/useOptionState";

export const useBookingStage = () => {
    const {
        options: { bookingStages: options },
        foreignKeys: { bookingStageId: initialValue },
        node: { id: recordId },
    } = useLoaderData<WorkpackageLoader>();
    
    const state = useOptionState<Stage>({
        persistMessage: "update:booking-stage",
        recordId,
        options,
        initialValue,
        recordKey: "workpackageId",
        valueKey: "bookingStage",
    });

    return {
        ...state,
        options: options,
    };
};

export type BookingStageBag = ReturnType<typeof useBookingStage>;

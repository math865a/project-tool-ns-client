import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import StageChips from "~/src/components/stage-chips/StageChips";
import { FormUI } from "~/src/design-system";
import { Stage } from "~/src";

export default function StageControl({ options }: { options: Stage[] }) {
    const { control, setValue } = useFormContext();
    const stage: string = useWatch({ name: "stage", control });

    const update = (stage: Stage) => {
        setValue("stage", stage.id);
    };

    const state = useMemo(() => {
        return options.find((d) => d.id === stage) ?? null;
    }, [stage, options]);

    return (
        <FormUI.Label label="Stadie" widthFrac={1.5}>
     
                <StageChips options={options} state={state} update={update} />
         
        </FormUI.Label>
    );
}

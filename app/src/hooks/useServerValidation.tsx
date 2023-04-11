import { FormErrorResponse } from "@math865a/project-tool.types";
import { useActionData, useNavigation } from "@remix-run/react";
import _ from "lodash";
import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";

export const useServerValidation = <
    T extends { [index: string]: any } = { [index: string]: any }
>(
    updateErrorMessage?: (message: string | null) => void
) => {
    const { setError } = useFormContext<T>();
    const transition = useNavigation();
    const actionData = useActionData<FormErrorResponse>();

    useEffect(() => {
        if (transition.state === "idle" && actionData) {
            _.forEach(actionData.validation, (v, k) => {
                setError(k as Path<T>, {
                    message: v,
                });
            });
            if (updateErrorMessage && actionData.message) {
                updateErrorMessage(actionData.message);
            }
        }
    }, [transition.state, actionData]);
};

export function ServerValidation({
    updateErrorMessage,
}: {
    updateErrorMessage?: (message: string | null) => void;
}) {
    useServerValidation(updateErrorMessage);
    return null;
}

export default ServerValidation

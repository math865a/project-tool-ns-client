import { useActionData, useNavigation } from "@remix-run/react";
import _ from "lodash";
import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { useNotifications } from "../components";
import { FormResponse } from "~/src";

export const useServerValidation = <
    T extends { [index: string]: any } = { [index: string]: any }
>(
    updateErrorMessage?: (message: string | null) => void
) => {
    const { notifyResponse } = useNotifications();
    const { setError, reset, getValues } = useFormContext<T>();
    const transition = useNavigation();
    const actionData = useActionData<FormResponse>();

    useEffect(() => {
        if (transition.state === "idle" && actionData) {
            if (actionData.status === "error") {
                _.forEach(actionData.validation, (v, k) => {
                    setError(k as Path<T>, {
                        message: v,
                    });
                });
                if (updateErrorMessage && actionData.message) {
                    updateErrorMessage(actionData.message);
                }
            } else {
                reset(getValues());
                if (updateErrorMessage) {
                    updateErrorMessage(null);
                }
            }
            notifyResponse(actionData);
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

export default ServerValidation;

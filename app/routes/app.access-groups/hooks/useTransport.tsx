import { GridRowId } from "@mui/x-data-grid-pro";
import { useActionData, useSubmit } from "@remix-run/react";
import { AccessGroupRow } from "../definitions/types";
import { toFormData } from "~/util/formData";
import { FormResponse } from "~/src";

export const useTransport = () => {
    const actionData = useActionData<FormResponse>();
    /*
        useEffect(() => {
            if (!actionData) return;
            if (actionData.status === "ok") {
                inform(actionData.message, "success");
            } else if (actionData.status === "error") {
                inform(actionData.message, "error");
            }
        }, [actionData]);
    */

    const submit = useSubmit();

    const createAccessGroup = (accessGroup: AccessGroupRow) => {
        submit(toFormData(accessGroup), { method: "PUT" });
    };

    const updateAccessGroup = (accessGroup: AccessGroupRow) => {
        submit(toFormData(accessGroup), { method: "POST" });
    };

    const deleteAccessGroup = (id: GridRowId) => {
        submit(toFormData({ id }), { method: "DELETE" });
    };

    return {
        createAccessGroup,
        updateAccessGroup,
        deleteAccessGroup,
    };
};

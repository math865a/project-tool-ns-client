import { GridRowId } from "@mui/x-data-grid-pro";
import { useActionData, useFetcher } from "@remix-run/react";
import { UserRow } from "../definitions/types";
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

    const getBodyUid = (uid: GridRowId) => {
        return toFormData({ uid });
    };

    const fetcher = useFetcher();

    const updateUser = (User: UserRow) => {
        fetcher.submit(toFormData(User), {
            method: "POST",
            action: `/app/users?/update`,
        });
    };

    const deleteUser = (id: GridRowId) => {
        console.log("ok");
        fetcher.submit(getBodyUid(id), {
            method: "POST",
            action: "/app/users?/deleteUser",
        });
    };

    const createProjectManager = (user: UserRow) => {
        fetcher.submit(toFormData(user), {
            method: "POST",
            action: `/app/users?/createProjectManager`,
        });
    };

    const deleteProjectManager = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/deleteProjectManager`,
        });
    };

    const mailWelcome = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/mailWelcome`,
        });
    };

    const resetPassword = (email: string) => {
        fetcher.submit(toFormData({ email }), {
            method: "POST",
            action: `/app/users?/resetPassword`,
        });
    };

    const mailCredentials = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/mailCredentials`,
        });
    };

    const deleteResourceProfile = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/deleteResourceProfile`,
        });
    };

    const splitUser = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/split`,
        });
    };

    const mergeUser = (uid: GridRowId, connectId: string) => {
        const dto = {
            id: connectId,
            uid,
        };
        fetcher.submit(toFormData(dto), {
            method: "POST",
            action: `/app/users?/merge`,
        });
    };

    const deactivateUser = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/deactivate`,
        });
    };

    const activateUser = (uid: GridRowId) => {
        fetcher.submit(getBodyUid(uid), {
            method: "POST",
            action: `/app/users?/activate`,
        });
    };

    return {
        updateUser,
        deleteUser,
        createProjectManager,
        deleteProjectManager,
        mailWelcome,
        resetPassword,
        deleteResourceProfile,
        mailCredentials,
        splitUser,
        mergeUser,
        activateUser,
        deactivateUser,
    };
};

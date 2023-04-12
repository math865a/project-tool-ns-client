import { FormResponse } from "@math865a/project-tool.types";
import { Box, Button, Divider, Typography } from "@mui/material";
import { ActionArgs, json } from "@remix-run/node";
import { useActionData, useSubmit } from "@remix-run/react";
import _ from "lodash";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { useNotifications, useSession } from "~/src";
import { Action, Controls, FormUI, Page } from "~/src/design-system";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest, toFormData } from "~/util/formData";
import PasswordChanged from "./PasswordChanged";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { namedAction } from "remix-utils";

export const handle = {
    BackAction: <BackAction title="Skift password" backTo="/app/session" />,
};

export async function action({ request }: ActionArgs) {
    return namedAction(request, {
        async updatePassword() {
            return await sendRequest(request, {
                url: getServiceUrl("userService", "password"),
                method: "POST",
                body: await parseRequest(request),
            });
        },
        async resetPassword() {
            return await sendRequest(request, {
                url: getServiceUrl("users", "reset-password"),
                method: "POST",
                body: await parseRequest(request),
            });
        },
    });
}

export default function ChangePassword() {
    const {
        user: { email },
    } = useSession();

    const methods = useForm({
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(schema),
    });
    const actionData = useActionData<FormResponse>();
    const submit = useSubmit();
    const { notifyResponse } = useNotifications();

    useEffect(() => {
        if (actionData && actionData.status === "error") {
            notifyResponse(actionData);
        }
    }, [actionData]);

    const onSubmit = (values: {
        password: string;
        oldPassword: string;
        confirmPassword: string;
    }) => {
        submit(toFormData(values), {
            method: "post",
            action: "/app/session/change-password?/updatePassword",
        });
    };

    const resetPassword = () => {
        submit(toFormData({ email }), {
            method: "post",
            action: "/app/session/change-password?/resetPassword",
        });
    };

    return (
        <FormProvider {...methods}>
            <Page.Section title="Skift password">
                <form style={{ width: "100%", marginTop: "8px" }}>
                    {!actionData || actionData.status === "error" ? (
                        <FormUI.VStack spacing={3}>
                            <Controls.Default.Text
                                widthFrac={1.3}
                                name="oldPassword"
                                label="Dit nuværende password"
                                required
                                type="password"
                                helperText={
                                    <Box width="max-content">
                                        <Action.TextButton
                                            text="Nulstil mit password i stedet"
                                            fontSize={11}
                                            onClick={() => resetPassword()}
                                        />
                                    </Box>
                                }
                            />

                            <Divider />
                            <Controls.Default.Text
                                widthFrac={1.3}
                                name="password"
                                label="Ny adgangskode"
                                required
                                type="password"
                            />
                            <Controls.Default.Text
                                widthFrac={1.3}
                                name="confirmPassword"
                                label="Gentag adgangskode"
                                required
                                type="password"
                            />
                            <FormUI.Actions
                                onSubmit={methods.handleSubmit(onSubmit)}
                                onCancel={methods.reset}
                                cancelText="Ryd"
                                confirmText="Bekræft"
                            />
                        </FormUI.VStack>
                    ) : (
                        <PasswordChanged
                            message={
                                actionData.message ??
                                "Dit password er blevet ændret"
                            }
                        />
                    )}
                </form>
            </Page.Section>
        </FormProvider>
    );
}
/*                    {!actionData || actionData.status === "error" ? (
                        <FormUI.VStack spacing={3}>
                            <Controls.Default.Text
                                widthFrac={1.3}
                                name="oldPassword"
                                label="Dit nuværende password"
                                required
                            />
                            <Divider />
                            <Controls.Default.Text
                                widthFrac={1.3}
                                name="password"
                                label="Ny adgangskode"
                                required
                            />
                            <Controls.Default.Text
                                widthFrac={1.3}
                                name="confirmPassword"
                                label="Gentag adgangskode"
                                required
                            />
                        </FormUI.VStack>
                    ) : (
                        <PasswordChanged />
                    )}*/

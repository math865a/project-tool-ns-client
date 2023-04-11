import { yupResolver } from "@hookform/resolvers/yup";
import { FormResponse } from "@math865a/project-tool.types";
import { ActionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import _ from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { Controls, FormUI, Page } from "~/src/design-system";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest } from "~/util/formData";
import PasswordChanged from "./PasswordChanged";
import { schema } from "./schema";

export const handle = {
    BackAction: <BackAction title="Skift password" backTo="/app/session"/>
};


export async function action({ request }: ActionArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("userService", "password"),
        method: "POST",
        body: await parseRequest(request),
    });
}

export default function ChangePassword() {
    const methods = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(schema),
    });
    const actionData = useActionData<FormResponse>();
    const onSubmit = formSubmit.useActionSubmit();

    return (
        <FormProvider {...methods}>
            <Page.Section
                title="Skift password"
                endActions={
                    <FormUI.Actions
                        hideConfirm={
                            _.keys(methods.formState.dirtyFields).length < 2
                        }
                        onSubmit={methods.handleSubmit(onSubmit)}
                        onCancel={methods.reset}
                        cancelText="Ryd"
                        confirmText="Bekræft"
                        hideCancel={!methods.formState.isDirty}
                    />
                }
            >
                <form style={{ width: "100%", marginTop: "8px" }}>
                    <ServerValidation />
                    {!actionData || actionData.status === "error" ? (
                        <FormUI.VStack spacing={3}>
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
                    )}
                </form>
            </Page.Section>
        </FormProvider>
    );
}

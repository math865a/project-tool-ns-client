import { yupResolver } from "@hookform/resolvers/yup";
import { ActionArgs } from "@remix-run/node";
import _ from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { Action, Controls, Details, FormUI, Page } from "~/src/design-system";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import BackAction from "~/src/layout/topbar/BackAction";
import { useSession } from "~/src/session-user";
import { parseRequest } from "~/util/formData";
import { schema } from "./schema";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { useNotifications } from "~/src";
import { IconLock } from "@tabler/icons-react";

export const handle = {
    BackAction: <BackAction title="Mine konto" noBack />,
};

export async function action({ request }: ActionArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("userService"),
        method: "POST",
        body: await parseRequest(request),
    });
}

export default function UserDetails() {
    const actionData = useActionData<any>();
    const { notifyResponse } = useNotifications();
    const { user } = useSession();
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            email: user.email,
            color: user.color,
        },
    });

    const onSubmit = formSubmit.useActionSubmit();

    const values = { ...methods.getValues() };
    const hasChanged = !_.isEqual(values, {
        name: user.name,
        email: user.email,
        color: user.color,
    });

    useEffect(() => {
        if (actionData) {
            notifyResponse(actionData);
        }
    }, [actionData]);

    return (
        <FormProvider {...methods}>
            <Page.Section
                title="Dine oplysninger"
                startActions={
                    <Action.TextLink
                        text="Skift password"
                        icon={IconLock}
                        to="change-password"
                    />
                }
                endActions={
                    <FormUI.Actions
                        onSubmit={methods.handleSubmit(onSubmit)}
                        onCancel={methods.reset}
                        hideCancel={!hasChanged}
                        hideConfirm={!hasChanged}
                        confirmText="Gem ændringer"
                    />
                }
            >
                <form style={{ width: "100%" }}>
                    <ServerValidation />
                    <Details.Container>
                        <Details.Item
                            title="Navn"
                            value={<Controls.Detail.Text name="name" />}
                        />
                        <Details.Item
                            title="Email"
                            value={<Controls.Detail.Text name="email" />}
                        />
                        <Details.Item
                            title="Farve"
                            value={<Controls.ColorPicker name="color" />}
                        />
                    </Details.Container>
                </form>
            </Page.Section>
        </FormProvider>
    );
}

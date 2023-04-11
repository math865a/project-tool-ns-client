import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData } from "@remix-run/react";
import {
    ActionArgs,
    LoaderArgs,
    json,
    redirect,
} from "@remix-run/node";
import _, { method } from "lodash";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { useDialogCloseRedirect } from "~/src/hooks/useDialogCloseRedirect";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import { parseRequest } from "~/util/formData";
import ResourceForm from "./ResourceForm";
import { schema } from "./form";
import { getDefaultValues } from "./form/getDefaultValues";
import { ICreateValues, IFormValues, IOptions } from "./form/types";
import { FormResponse } from "@math865a/project-tool.types";
import { AccessGroupsControl } from "~/src/components/forms";
import { useEffect } from "react";
import { generateId } from "~/util";
import { defaultColors } from "~/src/design-system/controls/color-picker/defaultColors";

export async function loader({ request }: LoaderArgs): Promise<IOptions> {
    return sendRequest(request, {
        url: getServiceUrl("users", "create-user-options"),
        method: "GET",
    });
}

export async function action({ request }: ActionArgs) {
    const dto = await parseRequest(request)
    console.log(dto)
    const result: FormResponse = await sendRequest(request, {
        url: getServiceUrl("users"),
        method: "POST",
        body: dto
    });
    if (result.status === "ok") {
        return redirect("../");
    }
    return json(result);
}

export type CreateUserLoader = typeof loader;

export default function CreateUserForm() {
    const options = useLoaderData<CreateUserLoader>();

    const methods = useForm({
        defaultValues: getDefaultValues(options),
        resolver: yupResolver(schema),
    });

    const handleClose = useDialogCloseRedirect("../", methods.reset);

    const transform = (values: IFormValues): ICreateValues => {
        return {
            ...values,
            accessGroups: _.map(values.accessGroups.map((d) => d.id)),
            resourceDto: {
                ...values.resourceDto,
                resourceTypes: _.map(
                    values.resourceDto.resourceTypes.map((d) => d.id)
                ),
            },
        };
    };

    const onSubmit = formSubmit.useActionSubmit<IFormValues, ICreateValues>({
        transform,
    });


    const connected: string = useWatch({
        control: methods.control,
        name: "connect",
    });

    useEffect(() => {
        if (connected !== "Ingen") {
            const option = options.connectOptions.find((d) => d.id === connected);
            if (!option) {
                throw new Error("Resource not found");
            }
            methods.setValue("uid", option.id);
            methods.setValue("name", option.name, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            methods.setValue("color", option.color, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            methods.setValue("isProjectManager", option.isProjectManager, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            methods.setValue("isResource", option.isResource)
        } else {
            methods.setValue("uid", generateId());
            methods.setValue("name", "");
            methods.setValue("isResource", false);
            methods.setValue("color", defaultColors[0]);
            methods.setValue("isProjectManager", false);
        }
    }, [connected]);

    return (
        <Dialog.Modal open onClose={handleClose} maxWidth="sm">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <ServerValidation />
                    <Dialog.Title title={`Opret bruger`} />
                    <Dialog.Body>
                        <FormUI.VStack>
                            <Controls.Default.Dropdown
                                name="connect"
                                label="Forbind til"
                                options={[
                                    { id: "Ingen", name: "Ingen" },
                                    ...options.connectOptions,
                                ]}
                                widthFrac={1.5}
                            />

                            <Controls.Default.Text
                                name="name"
                                label="Navn"
                                disabled={connected !== "Ingen"}
                                required
                                widthFrac={1.5}
                            />
                            <Controls.Default.Text
                                name="email"
                                label="Email"
                                required
                                widthFrac={1.5}
                            />
                            <Controls.Default.Color
                                name="color"
                                label="Farve"
                                disabled={connected !== "Ingen"}
                            />
                            <AccessGroupsControl
                                accessGroups={options.accessGroups}
                            />
                            <FormUI.HStack>
                                <Controls.Default.Boolean
                                    name="isResource"
                                    label="Ressource"
                                    disabled={connected !== "Ingen"}
                                />
                                <Controls.Default.Boolean
                                    name="isProjectManager"
                                    label="Projektleder"
                                />
                            </FormUI.HStack>
                            <ResourceForm
                                isConnected={connected !== "Ingen"}
                            />
                            <FormUI.HStack>
                                <Controls.Default.Boolean
                                    name="sendWelcomeEmail"
                                    label="Send velkomstmail"
                                />
                            </FormUI.HStack>
                        </FormUI.VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <FormUI.Actions onCancel={handleClose}/>
                    </Dialog.Footer>
                </form>
            </FormProvider>
        </Dialog.Modal>
    );
}

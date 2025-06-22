import { yupResolver } from "@hookform/resolvers/yup";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import _ from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { useDialogCloseRedirect } from "~/src/hooks/useDialogCloseRedirect";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import { parseRequest } from "~/util/formData";
import {
    CreateValues,
    getDefaultValues,
    ResourcesControl,
    schema,
} from "./form";
import { useLoaderData } from "@remix-run/react";
import { FormResponse } from "~/src";

export async function loader({ request }: LoaderArgs): Promise<any> {
    return await sendRequest(request, {
        url: getServiceUrl("resourceTypes", "create-form"),
        method: "GET",
    });
}

export async function action({ request }: ActionArgs) {
    const result: FormResponse = await sendRequest(request, {
        url: getServiceUrl("resourceTypes"),
        method: "POST",
        body: await parseRequest(request),
    });
    if (result.status === "ok") {
        return redirect(`../${result.id}`);
    }
    return json(result);
}

export default function CreateResourceType() {
    const { record, options } = useLoaderData<typeof loader>();

    const methods = useForm({
        defaultValues: getDefaultValues(record),
        resolver: yupResolver(schema),
    });

    const handleClose = useDialogCloseRedirect(
        "/app/resourcetypes",
        methods.reset
    );

    const transform = (values: CreateValues) => {
        const vals = {
            ...values,
            resources: _.map(values.resources.map((d) => d.id)),
            typeNo: values.typeNo ? Number(values.typeNo) : 1,
        };
        console.log(vals);
        return vals;
    };

    const handleSubmit = () => {
        console.log("submit");
    };

    const onSubmit = formSubmit.useActionSubmit<CreateValues, any>({
        transform,
        action: "/app/resourcetypes/create",
    });

    return (
        <Dialog.Modal open onClose={handleClose} maxWidth="sm">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    {/*<ServerValidation />*/}
                    <Dialog.Title title="Opret ressourcetype" />
                    <Dialog.Body>
                        <FormUI.VStack>
                            <Controls.Default.Dropdown
                                label="Kontrakt"
                                name="contract"
                                options={options.contractOptions}
                                required
                            />

                            <Controls.Default.Text
                                label="Navn"
                                name="name"
                                required
                            />
                            <FormUI.HStack>
                                <Controls.Default.Text
                                    label="Forkortelse"
                                    name="abbrevation"
                                    required
                                    widthFrac={0.8}
                                />
                                <Controls.Default.Text
                                    label="Typenr."
                                    name="typeNo"
                                    required
                                    widthFrac={0.8}
                                />
                            </FormUI.HStack>
                            <FormUI.HStack>
                                <Controls.Default.Text
                                    name="salesDefault"
                                    label="Salgspris"
                                    widthFrac={0.75}
                                    adornmentText="kr/t"
                                />
                                <Controls.Default.Text
                                    name="costDefault"
                                    label="Salgspris overtid"
                                    widthFrac={0.75}
                                    adornmentText="kr/t"
                                />
                            </FormUI.HStack>
                            <ResourcesControl
                                options={options.resourceOptions}
                            />
                        </FormUI.VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <FormUI.Actions
                            onCancel={handleClose}
                            onSubmit={handleSubmit}
                        />
                    </Dialog.Footer>
                </form>
            </FormProvider>
        </Dialog.Modal>
    );
}

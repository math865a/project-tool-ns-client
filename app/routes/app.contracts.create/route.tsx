import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { requireAuth, sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { useDialogCloseRedirect } from "~/src/hooks/useDialogCloseRedirect";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import { parseRequest } from "~/util/formData";
import { schema } from "./schema";
import { FormResponse } from "~/src";

export async function loader({ request }: LoaderArgs) {
    await requireAuth(request);
    return json({
        record: {
            name: "",
            abbrevation: "",
        },
        options: [],
    });
}

export async function action({ request }: ActionArgs) {
    const result: FormResponse = await sendRequest(request, {
        url: getServiceUrl("contracts"),
        method: "POST",
        body: await parseRequest(request),
    });
    if (result.status === "ok") {
        return redirect("..");
    }
    return json(result);
}

export default function CreateForm() {
    const record = useLoaderData<typeof loader>();

    const methods = useForm({
        defaultValues: record,
        resolver: yupResolver(schema),
    });

    const handleClose = useDialogCloseRedirect("/app/contracts", methods.reset);

    const onSubmit = formSubmit.useActionSubmit();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const updateErrorMessage = (message: string | null) => {
        setErrorMessage(message);
    };

    return (
        <Dialog.Modal open onClose={handleClose} maxWidth="sm">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <ServerValidation updateErrorMessage={updateErrorMessage} />
                    <Dialog.Title title="Opret kontrakt" />
                    <Dialog.Body>
                        {errorMessage ? (
                            <Typography pb={1} color="error">
                                {errorMessage}
                            </Typography>
                        ) : null}
                        <FormUI.VStack>
                            <Controls.Default.Text
                                name="name"
                                label="Navn"
                                required
                            />
                            <Controls.Default.Text
                                name="abbrevation"
                                label="Forkortelse"
                                required
                            />
                        </FormUI.VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <FormUI.Actions onCancel={handleClose} />
                    </Dialog.Footer>
                </form>
            </FormProvider>
        </Dialog.Modal>
    );
}

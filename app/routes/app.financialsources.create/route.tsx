import { yupResolver } from "@hookform/resolvers/yup";
import {
    FormResponse
} from "@math865a/project-tool.types";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { FormProvider, useForm } from "react-hook-form";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { Dialog, FormUI } from "~/src/design-system";
import { useDialogCloseRedirect } from "~/src/hooks/useDialogCloseRedirect";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import { parseRequest } from "~/util/formData";
import FormControls from "./controls/FormControls";
import { getDefaultValues } from "./util/getDefaultValues";
import { schema } from "./util/schema";

export async function action({ request }: ActionArgs) {
    const result: FormResponse = await sendRequest(request, {
        url: getServiceUrl("financialSources"),
        method: "POST",
        body: await parseRequest(request),
    });
    if (result.status === "ok") {
        return redirect("/app/financialsources");
    }
    return json(result);
}

export default function CreateForm() {
    const methods = useForm({
        defaultValues: getDefaultValues(),
        resolver: yupResolver(schema),
    });

    const handleClose = useDialogCloseRedirect(
        "/app/financialsources",
        methods.reset
    );

    const onSubmit = formSubmit.useActionSubmit();

    return (
        <Dialog.Modal open onClose={handleClose} maxWidth="sm">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <ServerValidation />
                    <Dialog.Title title="Opret finanskilde" />
                    <Dialog.Body>
                        <FormControls />
                    </Dialog.Body>
                    <Dialog.Footer>
                        <FormUI.Actions onCancel={handleClose} />
                    </Dialog.Footer>
                </form>
            </FormProvider>
        </Dialog.Modal>
    );
}

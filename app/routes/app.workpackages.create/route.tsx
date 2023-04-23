import { yupResolver } from "@hookform/resolvers/yup";
import { FormResponse } from "@math865a/project-tool.types";
import { Typography } from "@mui/material";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { Action as A, Subject } from "~/src/_definitions";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { useDialogCloseRedirect } from "~/src/hooks/useDialogCloseRedirect";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import { usePermissions } from "~/src/session-user";
import { parseRequest } from "~/util/formData";
import PeriodControl from "./Control.Period";
import ProjectManagerControl from "./Control.ProjectManager";
import StageControl from "./Control.Stage";
import { CreateValues, schema } from "./form";

export async function loader({ request }: LoaderArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("workpackages", "create-form"),
        method: "GET",
    });
}

export async function action({ request }: ActionArgs) {
    const result: FormResponse = await sendRequest(request, {
        url: getServiceUrl("workpackages"),
        method: "POST",
        body: await parseRequest(request),
    });
    if (result.status === "ok") {
        return redirect(`../${result.id}`);
    }
    return json(result);
}

export default function CreateWorkpackage() {
    const Permissions = usePermissions();

    const navigate = useNavigate();

    if (!Permissions.can(A.Write, Subject.Workpackages)) {
        navigate(-1);
    }

    const {
        record,
        options: {
            contractOptions,
            financialSourceOptions,
            projectManagerOptions,
            stageOptions,
        },
    } = useLoaderData<typeof loader>();
    console.log(record)

    console.log(stageOptions)
    const methods = useForm({
        defaultValues: record,
        resolver: yupResolver(schema),
    });

    const handleClose = useDialogCloseRedirect(
        "/app/workpackages",
        methods.reset
    );

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const updateErrorMessage = (message: string | null) => {
        setErrorMessage(message);
    };

    const onSubmit = formSubmit.useActionSubmit<CreateValues>();

    return (
        <Dialog.Modal open onClose={handleClose} maxWidth="sm">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <ServerValidation updateErrorMessage={updateErrorMessage} />
                    <Dialog.Title title="Opret arbejdspakke" />
                    <Dialog.Body>
                        {errorMessage ? (
                            <Typography pb={1} color="error">
                                {errorMessage}
                            </Typography>
                        ) : null}
                        <FormUI.VStack>
                            <FormUI.HStack>
                                <Controls.Default.Dropdown
                                    name="contract"
                                    options={contractOptions}
                                    required
                                    label="Kontrakt"
                                    widthFrac={1}
                                />
                                <Controls.Default.Dropdown
                                    name="financialSource"
                                    options={financialSourceOptions}
                                    required
                                    label="Finanskilde"
                                    widthFrac={0.75}
                                />
                            </FormUI.HStack>
                            <Controls.Default.Text
                                name="serialNo"
                                label="Serienummer"
                                required
                                widthFrac={1}
                            />

                            <FormUI.HStack>
                                <Controls.Default.Text
                                    name="name"
                                    label="Navn"
                                    rows={3}
                                    fullWidth
                                    widthFrac={2}
                                />
                            </FormUI.HStack>
                            <ProjectManagerControl
                                options={projectManagerOptions}
                            />
                            <PeriodControl />

                            <StageControl options={stageOptions} />
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

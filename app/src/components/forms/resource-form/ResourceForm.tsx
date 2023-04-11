import _ from "lodash";
import {
    IResourceFormOptons,
    IResourceFormValues,
    IResourceValues,
    getDefaultValues,
    schema,
} from "./form";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useDialogCloseRedirect } from "~/src/hooks/useDialogCloseRedirect";
import { formSubmit } from "~/src/hooks/useFormSubmit";
import ServerValidation from "~/src/hooks/useServerValidation";
import { ResourceControls } from "../resource-controls";

export function ResourceForm({
    base,
    options,
    closeTo = "../",
    title = "Opret ressource",
}: {
    base?: Pick<IResourceFormValues, "id" | "name" | "color">;
    options: IResourceFormOptons;
    closeTo?: string;
    title?: string;
}) {
    const methods = useForm({
        defaultValues: getDefaultValues(options, base),
        resolver: yupResolver(schema),
    });

    const handleClose = useDialogCloseRedirect(closeTo, methods.reset);

    const transform = (values: IResourceFormValues): IResourceValues => {
        return {
            ...values,
            resourceTypes: _.map(values.resourceTypes.map((d) => d.id)),
        };
    };

    const onSubmit = formSubmit.useActionSubmit<
        IResourceFormValues,
        IResourceValues
    >({
        transform,
    });

    return (
        <Dialog.Modal open onClose={handleClose} maxWidth="sm">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <ServerValidation />
                    <Dialog.Title title={title} />
                    <Dialog.Body>
                        <FormUI.VStack>
                            <Controls.Default.Text
                                name="name"
                                label="Navn"
                                autoFocus
                                required
                                widthFrac={1.5}
                                disabled={!!base}
                            />

                            <ResourceControls {...options} autoFocus={!!base} />
                            <Controls.Default.Color
                                name="color"
                                label="Farve"
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

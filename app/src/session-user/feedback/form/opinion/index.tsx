import { faSend } from "@fortawesome/pro-light-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { IFeedbackFormProps } from "../FeedbackFormDialog";
import { schema } from "./definitions/schema";

export function OpinionForm({ onSubmit, onClose }: IFeedbackFormProps) {
    const methods = useForm({
        defaultValues: {
            type: "opinion",
            topic: "",
            text: "",
        },
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ width: "100%" }}
            >
                <Dialog.Title title="Giv din mening" />

                <Dialog.Body>
                    <FormUI.VStack>
                        <Controls.Default.Text
                            name="topic"
                            label="Emne"
                            fullWidth
                            autoFocus
                        />
                        <Controls.Default.Text
                            name="text"
                            label="Beskrivelse"
                            fullWidth
                            minRows={5}
                        />
                    </FormUI.VStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <FormUI.Actions
                    hideOnNotDirty
                        onCancel={() => onClose(methods.formState.isDirty)}
                        confirmText="Indsend"
                        confirmIcon={faSend}
                        confirmColor="inherit"
                    />
                </Dialog.Footer>
            </form>
        </FormProvider>
    );
}

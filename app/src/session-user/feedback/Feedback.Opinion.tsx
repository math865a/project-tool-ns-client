import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Opinion } from "~/src/_definitions";
import { Controls, FormUI } from "~/src/design-system";
import { FeedbackDialog } from "./Feedback.Dialog";
import * as yup from "yup";

export const schema = yup.object({
    topic: yup.string().required("Du mangler at angive et emne."),
    text: yup.string().required("Du mangler at angive en besked."),
});

export function OpinionForm() {
    const methods = useForm({
        defaultValues: {
            topic: "",
            text: "",
        } as Opinion,
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <form
                style={{ width: "100%" }}
            >
                <FeedbackDialog title="Giv os din mening">
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
                </FeedbackDialog>
            </form>
        </FormProvider>
    );
}

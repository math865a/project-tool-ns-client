import { faSend } from "@fortawesome/pro-light-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Controls, Dialog, FormUI } from "~/src/design-system";
import { IFeedbackFormProps } from "../FeedbackFormDialog";
import { schema } from "./definitions/schema";

export function BugForm({ onSubmit, onClose }: IFeedbackFormProps) {
    const methods = useForm({
        defaultValues: {
            type: "bug",
            summary: "",
            priority: 0,
            page: "",
            stepsToReproduce: "",
            expectedResult: "",
            actualResult: "",
            comments: "",
        },
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ width: "100%" }}
            >
                <Dialog.Title title="Rapporter en fejl" />
                <Dialog.Body>
                    <FormUI.VStack>
                        <Controls.Default.Text
                            name="summary"
                            label="Overskrift"
                            fullWidth
                            autoFocus
                        />
                        <Controls.Default.RadioGroup
                            fullWidth
                            name="priority"
                            label="Prioritet"
                            direction="row"
                            options={[
                                { label: "Lav", value: 0 },
                                { label: "Normal", value: 1 },
                                { label: "Høj", value: 2 },
                                { label: "Kritisk", value: 3 },
                            ]}
                        />
                        <Divider />
                        <Controls.Default.Text
                            widthFrac={2}
                            name="page"
                            label="Side"
                            placeholder="Hvilken side oplevede du fejlen på?"
                        />
                        <Controls.Default.Text
                            name="stepsToReproduce"
                            label="Genskabelse"
                            placeholder="Hvordan kan fejlen genskabes?"
                            minRows={3}
                            fullWidth
                        />
                        <Controls.Default.Text
                            name="expectedResult"
                            label="Forventet resultat"
                            placeholder="Hvad forventede du at skulle ske?"
                            minRows={1}
                            fullWidth
                        />
                        <Controls.Default.Text
                            name="actualResult"
                            label="Faktisk resultat"
                            placeholder="Hvad skete der i stedet?"
                            minRows={1}
                            fullWidth
                        />
                        <Divider />
                        <Controls.Default.Text
                            name="comments"
                            label="Andet"
                            placeholder="Har du noget andet at tilføje?"
                            minRows={1}
                            fullWidth
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

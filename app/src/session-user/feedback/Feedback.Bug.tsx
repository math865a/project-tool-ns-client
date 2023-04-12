import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Bug } from "~/src/_definitions";
import { Controls, FormUI } from "~/src/design-system";
import { useSession } from "../SessionContextProvider";
import { FeedbackDialog } from "./Feedback.Dialog";
import * as yup from "yup"

export const schema = yup.object({
    priority: yup.number().min(0).max(3).required(),
    summary: yup.string().required(),
    page: yup.string(),
    stepsToReproduce: yup.string(),
    expectedResult: yup.string(),
    actualResult: yup.string(),
    remarks: yup.string()
})

export function BugForm() {
    const {
        feedback,
    } = useSession();

    const methods = useForm({
        defaultValues: {
            summary: "",
            priority: 0,
            page: "",
            stepsToReproduce: "",
            expectedResult: "",
            actualResult: "",
            remarks: "",
        } as Bug,
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <form
          
                style={{ width: "100%" }}
            >
                <FeedbackDialog title="Rapporter en fejl">
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
                         fullWidth
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
                </FeedbackDialog>
            </form>
        </FormProvider>
    );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, Slider } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Feature } from "~/src/_definitions";
import { Controls, FormUI } from "~/src/design-system";
import { FeedbackDialog } from "./Feedback.Dialog";

export const schema = yup.object({
    page: yup.string(),
    problem: yup.string(),
    impact: yup.string(),
    reach: yup.number(),
    urgency: yup.number(),
    goals: yup.string(),
    solution: yup.string(),
    remarks: yup.string(),
    cost: yup.string(),
});

export function FeatureForm() {
    const methods = useForm({
        defaultValues: {
            page: "",
            problem: "",
            reach: 0,
            urgency: 0,
            goals: "",
            solution: "",
            remarks: "",
        } as Feature,
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <form style={{ width: "100%" }}>
                <FeedbackDialog title="Foreslå en ny funktion">
                    <FormUI.VStack>
                        <Controls.Default.Text
                            fullWidth
                            name="page"
                            label="Side"
                            placeholder="Hvilken side oplevede du fejlen på?"
                        />

                        <Controls.Default.Text
                            name="problem"
                            label="Problem"
                            fullWidth
                            placeholder="Beskriv problemstilling"
                            minRows={2}
                        />

                        <Controls.Default.Text
                            name="goals"
                            label="Løsningsmål"
                            fullWidth
                            placeholder="Hvad skal en løsning kunne for at løse problemet?"
                            minRows={2}
                        />

                        <Controls.Default.Text
                            name="cost"
                            label="Omkostning"
                            fullWidth
                            placeholder="Hvad er omkostningerne ved ikke at implementere denne feature?"
                            minRows={2}
                        />

                        <Controls.Default.Text
                            name="solution"
                            label="Løsningsforslag"
                            fullWidth
                            placeholder="Har du nogle idéer til hvordan løsningen kan se ud?"
                            minRows={2}
                        />

                        <Divider />
                        <FormUI.Label
                            label="Hvor stort er omfanget af brugere som er berørt?"
                            fullWidth
                        >
                            <Box px={5} pt={2} flexGrow={1}>
                                <Slider
                                    {...methods.register("reach")}
                                    defaultValue={0}
                                    step={10}
                                    min={0}
                                    max={100}
                                    marks={[
                                        1, 10, 20, 30, 40, 50, 60, 70, 80, 90,
                                        100,
                                    ].map((d) => ({
                                        value: d === 1 ? 0 : d,
                                        label: d + "%",
                                    }))}
                                />
                            </Box>
                        </FormUI.Label>

                        <Controls.Default.RadioGroup
                            fullWidth
                            name="urgency"
                            label="Prioritet"
                            direction="row"
                            options={[
                                { label: "Lav", value: 0 },
                                { label: "Normal", value: 1 },
                                { label: "Høj", value: 2 },
                                { label: "Kritisk", value: 3 },
                            ]}
                        />
                        <Controls.Default.Text
                            name="remarks"
                            label="Bemærkninger"
                            minRows={3}
                            fullWidth
                        />
                    </FormUI.VStack>
                </FeedbackDialog>
            </form>
        </FormProvider>
    );
}

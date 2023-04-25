import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmit } from "@remix-run/react";
import { Controls, Details, FormUI, Page } from "design";
import { FormProvider, useForm } from "react-hook-form";
import { Action, Subject } from "~/src/_definitions";
import { ServerValidation } from "~/src/hooks";
import { Can } from "~/src/session-user";
import { useWorkpackage, useWorkpackageLoader } from "~/src/state";
import { IWorkpackageDetails } from "~/src/state/workpackage-profile/state";
import { toFormData } from "~/util";
import { schema } from "./details";
import { Box } from "@mui/material";

export default function DetailsSection() {
    const {
        options: { contracts, financialSources },
    } = useWorkpackageLoader();
    const { details } = useWorkpackage();
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: details.state,
    });

    const submit = useSubmit();
    const onSubmit = (values: IWorkpackageDetails) => {
        submit(toFormData(values), { method: "post" });
    };

    return (
        <FormProvider {...methods}>
            <Page.Section
                xs={4}
                title="Detaljer"
                endActions={
                    <FormUI.Actions
                        onSubmit={methods.handleSubmit(onSubmit)}
                        hideOnNotDirty
                        confirmText="Gem ændringer"
                    />
                }
            >
                <Can I={Action.Write} a={Subject.Workpackages} passThrough>
                    {(allowed) => (
                        <form style={{ width: "100%", paddingBottom: "8px" }}>
                            <ServerValidation />
                            <Details.Container spacing={2}>
                                <Details.Item
                                    title="Kontrakt"
                                    value={
                                        <Controls.Detail.Dropdown
                                            name="contractId"
                                            options={contracts}
                                            disabled={!allowed}
                                        />
                                    }
                                />
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexGrow={1}
                                >
                                    <Box width="50%">
                                        <Details.Item
                                            title="Finanskilde"
                                            value={
                                                <Controls.Detail.Dropdown
                                                    name="financialSourceId"
                                                    options={financialSources}
                                                    disabled={!allowed}
                                                />
                                            }
                                        />
                                    </Box>
                                    <Box width="50%">
                                        <Details.Item
                                            title="Serienummer"
                                            value={
                                                <Controls.Detail.Text
                                                    name="serialNo"
                                                    disabled={!allowed}
                                                />
                                            }
                                        />
                                    </Box>
                                </Box>

                                <Details.Item
                                    title="Navn"
                                    align="flex-start"
                                    value={
                                        <Controls.Detail.Text
                                            name="name"
                                            rows={1}
                                            disabled={!allowed}
                                        />
                                    }
                                />
                            </Details.Container>
                        </form>
                    )}
                </Can>
            </Page.Section>
        </FormProvider>
    );
}

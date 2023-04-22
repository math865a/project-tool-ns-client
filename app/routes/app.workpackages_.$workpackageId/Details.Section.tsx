import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { Controls, Details, FormUI, Page } from "design";
import { FormProvider, useForm } from "react-hook-form";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import { useWorkpackage } from "~/src/state";
import { IWorkpackageDetails } from "~/src/state/workpackage-profile/state";
import { schema } from "./details";
import { WorkpackageLoader } from "./route";
import { toFormData } from "~/util";
import { ServerValidation } from "~/src/hooks";

export default function DetailsSection() {
    const {
        options: { contracts, financialSources },
    } = useLoaderData<WorkpackageLoader>();
    const { details } = useWorkpackage();
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: details.state,
    });

    const submit = useSubmit()
    const onSubmit = (values: IWorkpackageDetails) => {
        submit(toFormData(values), { method: "post" });
    };

    return (
        <FormProvider {...methods}>
            <Page.Section
                alignSelf="stretch"
                xs={6}
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
                            <ServerValidation/>
                            <Details.Container>
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
                                <Details.Item
                                    title="Serienummer"
                                    value={
                                        <Controls.Detail.Text
                                            name="serialNo"
                                            disabled={!allowed}
                                        />
                                    }
                                />
                                <Details.Item
                                    title="Navn"
                                    align="flex-start"
                                    value={
                                        <Controls.Detail.Text
                                            name="name"
                                            rows={2}
                                            disabled={!allowed}
                                        />
                                    }
                                />
                                <Details.Item
                                    title="Beskrivelse"
                                    align="flex-start"
                                    value={
                                        <Controls.Detail.Text
                                            name="description"
                                            rows={6}
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

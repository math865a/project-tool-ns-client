import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { Controls, Details, FormUI, Page } from "design";
import { FormProvider, useForm } from "react-hook-form";
import { Action as A, Can, Subject } from "~/src";
import { toFormData } from "~/util/formData";
import { loader } from "./route";
import { getDefaultValues, schema } from "./details";
import { ServerValidation } from "~/src/hooks";

export function DetailsSection() {
    const { node } = useLoaderData<typeof loader>();
    const methods = useForm({
        defaultValues: getDefaultValues(node),
        resolver: yupResolver(schema),
    });

    const submit = useSubmit();

    const onSubmit = (values: ReturnType<typeof getDefaultValues>) => {
        submit(toFormData(values), { method: "post" });
    };

    return (
        <FormProvider {...methods}>
            <Page.Section
                xs={6}
                title="Detaljer"
                endActions={
                    <FormUI.Actions
                        hideOnNotDirty
                        confirmText="Gem"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    />
                }
            >
                <form style={{ width: "100%" , paddingBottom: "8px"}}>
                    <ServerValidation/>
                    <Can I={A.Write} a={Subject.Contracts} passThrough>
                        {(allowed) => (
                            <Details.Container>
                                <Details.Item
                                    title="Navn"
                                    value={
                                        <Controls.Detail.Text
                                            name="name"
                                            disabled={!allowed}
                                        />
                                    }
                                />
                                <Details.Item
                                    title="Forkortelse"
                                    value={
                                        <Controls.Detail.Text
                                            name="abbrevation"
                                            disabled={!allowed}
                                        />
                                    }
                                />
                            </Details.Container>
                        )}
                    </Can>
                </form>
            </Page.Section>
        </FormProvider>
    );
}

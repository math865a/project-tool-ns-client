import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { Controls, FormUI, Page } from "design";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Details } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { toFormData } from "~/util/formData";
import { getDefaultValues, schema } from "./details";
import { ResourceTypeLoader } from "./route";
import { ServerValidation } from "~/src/hooks";

export default function DetailsSection() {
    const { node } = useLoaderData<ResourceTypeLoader>();
    const defaultValues = useMemo(() => getDefaultValues(node), [node]);
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    FormUI.useResetStale(methods.reset, defaultValues);

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
                        onSubmit={methods.handleSubmit(onSubmit)}
                        confirmText="Gem ændringer"
                    />
                }
            >
                <Can I={A.Write} a={Subject.ResourceTypes} passThrough>
                    {(allowed) => (
                        <form style={{ width: "100%", paddingBottom: "8px" }}>
                            <ServerValidation />
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
                                <Details.Item
                                    title="Typenummer"
                                    value={
                                        <Controls.Detail.Text
                                            name="typeNo"
                                            disabled={!allowed}
                                        />
                                    }
                                />
                                <Details.Item
                                    xsTitle={4}
                                    xsValue={8}
                                    title="Salgspris"
                                    value={
                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            flexGrow={1}
                                            alignItems="center"
                                        >
                                            <Controls.Detail.Text
                                                width={100}
                                                name="salesDefault"
                                                adornmentText="kr/t"
                                                disabled={!allowed}
                                            />
                                            /
                                            <Controls.Detail.Text
                                                width={100}
                                                name="salesOvertime"
                                                adornmentText="kr/t"
                                                disabled={!allowed}
                                            />
                                        </Stack>
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

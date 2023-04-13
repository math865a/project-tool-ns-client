import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import { useRouteLoaderData, useSubmit } from "@remix-run/react";
import { Controls, Details, FormUI, Page } from "design";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Action as A, ResourceProfile, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import { toFormData } from "~/util/formData";
import { getDefaultValues, schema } from "./details";
import { ServerValidation } from "~/src/hooks";

export default function DetailsSection() {
    const { node } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;
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
                alignSelf="stretch"
                xs={4}
                title="Detaljer"
                endActions={
                    <FormUI.Actions
                        hideOnNotDirty
                        onSubmit={methods.handleSubmit(onSubmit)}
                        confirmText="Gem ændringer"
                    />
                }
            >
                <Can I={A.Write} a={Subject.Resources} passThrough>
                    {(allowed) => (
                        <form style={{ width: "100%", paddingBottom: "8px" }}>
                            <ServerValidation/>
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
                                    title="Initialer"
                                    value={
                                        <Controls.Detail.Text
                                            name="initials"
                                            disabled={!allowed}
                                        />
                                    }
                                />
                                <Details.Item
                                    xsTitle={4}
                                    xsValue={8}
                                    title="Kostpris"
                                    value={
                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            flexGrow={1}
                                            alignItems="center"
                                        >
                                            <Controls.Detail.Text
                                                width={100}
                                                name="costDefault"
                                                adornmentText="kr/t"
                                                disabled={!allowed}
                                            />
                                            <Box px={1}>/</Box>

                                            <Controls.Detail.Text
                                                width={100}
                                                name="costOvertime"
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

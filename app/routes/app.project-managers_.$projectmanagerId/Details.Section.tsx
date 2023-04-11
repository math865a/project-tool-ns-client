import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { ColorPickerControl, Controls, Details, FormUI, Page } from "design";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Action as A, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import { toFormData } from "~/util/formData";
import { schema } from "./details";
import { ProjectManagerLoader } from "./route";

export default function DetailsSection() {
    const { node } = useLoaderData<ProjectManagerLoader>();
    const defaultValues = useMemo(
        () => ({
            name: node.name,
            color: node.color,
        }),
        [node.name, node.color]
    );
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    FormUI.useResetStale(methods.reset, defaultValues);

    const submit = useSubmit();

    const onSubmit = (values: {name: string, color: string}) => {
        submit(toFormData(values), { method: "post", action: `/app/project-managers/${node.id}?/updateDetails` });
    };

    return (
        <FormProvider {...methods}>
            <Page.Section
                alignSelf="stretch"
                xs={5}
                title="Detaljer"
                endActions={
                    <FormUI.Actions
                        hideOnNotDirty
                        onSubmit={methods.handleSubmit(onSubmit)}
                    />
                }
            >
                <Can I={A.Write} a={Subject.ProjectManagers} passThrough>
                    {(allowed) => (
                        <form style={{ width: "100%" }}>
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
                                    title="Farve"
                                    value={
                                        <ColorPickerControl
                                            name="color"
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

import { Form, useLoaderData } from "@remix-run/react";
import { Action as A, Can, Subject } from "~/src";
import { Action } from "~/src/design-system";
import { ProjectManagerLoader } from "../route";
import { IconUserMinus, IconUserPlus } from "@tabler/icons-react";

export function ToggleResourceAction() {
    const {
        node: { isResource },
    } = useLoaderData<ProjectManagerLoader>();

    return (
        <Can I={A.Write} a={Subject.ProjectManagers}>
            {isResource ? <DeleteResourceAction /> : <AddResourceAction />}
        </Can>
    );
}

function AddResourceAction() {
    return (
        <Can I={A.Write} a={Subject.Resources}>
            <Action.TextLink
                to="create/resource"
                text="Opret som ressource"
                icon={IconUserPlus}
            />
        </Can>
    );
}

function DeleteResourceAction() {
    return (
        <Can I={A.Delete} a={Subject.Resources}>
            <Form method="post" action="?/deleteResource">
                <Action.TextButton text="Slet ressource" icon={IconUserMinus} />
            </Form>
        </Can>
    );
}

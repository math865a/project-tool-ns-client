import { Form } from "@remix-run/react";
import { Action as A, Can, Subject } from "~/src";
import { Action } from "~/src/design-system";
import { IconTrash } from "@tabler/icons-react";

export function DeleteAction() {
    return (
        <Can I={A.Delete} a={Subject.ProjectManagers}>
            <Form method="delete" action="?/deleteProjectManager">
                <Action.TextButton text="Slet" icon={IconTrash} type="submit" />
            </Form>
        </Can>
    );
}

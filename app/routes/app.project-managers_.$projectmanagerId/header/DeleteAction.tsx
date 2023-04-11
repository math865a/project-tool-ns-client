import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { Form } from "@remix-run/react";
import { Can } from "~/src";
import { Action as A, Subject } from "~/src";
import { Action } from "~/src/design-system";

export function DeleteAction() {
    return (
        <Can I={A.Delete} a={Subject.ProjectManagers}>
            <Form method="delete" action="?/deleteProjectManager">
                <Action.TextButton
                    text="Slet"
                    icon={faTrash}
                    type="submit"
                />
            </Form>
        </Can>
    );
}

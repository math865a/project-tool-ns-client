import { useLoaderData } from "@remix-run/react";
import { Action as A, Can, Subject } from "~/src";
import { Action } from "~/src/design-system";
import { ProjectManagerLoader } from "../route";
import { IconUserPlus } from "@tabler/icons-react";

export function AddUserAction() {
    const {
        node: { isUser },
    } = useLoaderData<ProjectManagerLoader>();

    if (isUser) return null;

    return (
        <Can I={A.Write} a={Subject.Users}>
            <Can I={A.Write} a={Subject.ProjectManagers}>
                <Action.TextLink
                    to="create/user"
                    text="Opret bruger"
                    icon={IconUserPlus}
                />
            </Can>
        </Can>
    );
}

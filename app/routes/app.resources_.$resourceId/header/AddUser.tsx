import { useRouteLoaderData } from "@remix-run/react";
import { Action as A, Can, ResourceProfile, Subject } from "~/src";
import { Action } from "~/src/design-system";
import { IconUserPlus } from "@tabler/icons-react";

export function AddUserAction() {
    const {
        node: { isUser },
    } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;

    if (isUser) return null;
    return (
        <Can I={A.Write} a={Subject.Users}>
            <Action.TextLink
                to="create/user"
                text="Opret bruger"
                icon={IconUserPlus}
            />
        </Can>
    );
}

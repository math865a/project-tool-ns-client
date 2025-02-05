import { Page } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { useLoaderData } from "@remix-run/react";
import { ResourceTypeLoader } from "../route";
import { IconFile } from "@tabler/icons-react";

export default function ResourceTypeTags() {
    const {
        contract: { id, name },
    } = useLoaderData<ResourceTypeLoader>();
    return (
        <Page.Tags>
            <Can I={A.Read} a={Subject.Contracts} passThrough>
                {(allowed) => (
                    <Page.Tag
                        icon={IconFile}
                        title={name}
                        to={`/app/contracts/${id}`}
                        disabled={!allowed}
                    />
                )}
            </Can>
        </Page.Tags>
    );
}

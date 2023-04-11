import {
    FormResponse,
    ResourceTypeProfile,
} from "@math865a/project-tool.types";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Page } from "design";
import { sendRequest } from "session";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { HasAccess, Subject } from "~/src";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest } from "~/util/formData";
import DetailsSection from "./Details.Section";
import HeaderSection from "./Header.Section";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const { node } = useRouteLoaderData(
        "routes/app.resourcetypes_.$resourcetypeId"
    ) as ResourceTypeProfile;
    return <BackAction title={node.name} backTo="/app/resourcetypes" />;
}

export async function loader({ params, request }: LoaderArgs) {
    invariant(params.resourcetypeId);
    return await sendRequest(request, {
        url: getServiceUrl("resourceTypes", params.resourcetypeId),
        method: "GET",
    });
}

export type ResourceTypeLoader = typeof loader;

export async function action({ params, request }: ActionArgs) {
    invariant(params.resourcetypeId);

    if (request.method === "DELETE") {
        const result: FormResponse = await sendRequest(request, {
            url: getServiceUrl("resourceTypes", params.resourcetypeId),
            method: "DELETE",
        });
        if (result.status === "ok") {
            return redirect("..");
        }
        return json(result);
    } else if (request.method === "POST") {
        return await sendRequest(request, {
            url: getServiceUrl("resourceTypes", params.resourcetypeId),
            method: "POST",
            body: await parseRequest(request),
        });
    }
    return json(null);
}

export default function ResourceTypeProfilePage() {
    return (
        <HasAccess to={Subject.ResourceTypes}>
            <Page.Root>
                <Page.Layout>
                    <HeaderSection />
                    <DetailsSection />
                </Page.Layout>
            </Page.Root>
        </HasAccess>
    );
}

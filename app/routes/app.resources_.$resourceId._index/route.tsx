import { ActionArgs, json, redirect } from "@remix-run/node";
import { useParams, useRouteLoaderData } from "@remix-run/react";
import { sendRequest } from "session";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { FormResponse, ResourceProfile } from "~/src";
import { ResourceCapacity } from "~/src/features/resource-capacity";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest } from "~/util/formData";
import DetailsSection from "./Details.Section";
import RelationsSection from "./Relations.Section";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const { node } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;
    return (
        <BackAction title={`${node.name} - Overblik`} backTo="/app/resources" />
    );
}

export async function action({ request, params }: ActionArgs) {
    invariant(params.resourceId);
    if (request.method === "DELETE") {
        const result: FormResponse = await sendRequest(request, {
            url: getServiceUrl("resources", params.resourceId),
            method: "DELETE",
        });
        if (result.status === "ok") {
            return redirect("/app/resources");
        }
        return json(result);
    } else if (request.method === "POST") {
        return await sendRequest(request, {
            url: getServiceUrl("resources", params.resourceId),
            method: "POST",
            body: await parseRequest(request),
        });
    }
    return json(null);
}

export default function ResourceProfilePage() {
    const { resourceId } = useParams();
    invariant(resourceId);
    return (
        <>
            <DetailsSection />
            <RelationsSection />
            <ResourceCapacity resourceId={resourceId} />
        </>
    );
}

import { LoaderArgs } from "@remix-run/node";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { ResourceTypeOption } from "~/src";

export async function loader({
    request,
}: LoaderArgs): Promise<ResourceTypeOption[]> {
    return await sendRequest(request, {
        url: getServiceUrl("resourceTypes", "options"),
        method: "GET",
    });
}

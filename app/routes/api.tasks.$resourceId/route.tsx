import { LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { DateTime as dt } from "luxon";
import { sendRequest } from "~/session.server";
import { getServiceUrl } from "~/server";

export async function loader({ request, params }: LoaderArgs) {
    invariant(params.resourceId);

    const url = new URL(request.url);
    const start =
        url.searchParams?.get("start")
    const end =
        url.searchParams?.get("end")

    if (!start || !end) {
        throw new Error("Missing start or end date");
    }

    return await sendRequest(request, {
        url: getServiceUrl(
            "schedule",
            "tasks",
            `${params.resourceId}/${start}/${end}`
        ),
        method: "GET",
    });
}

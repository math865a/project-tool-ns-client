import { ActionArgs } from "@remix-run/server-runtime";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { parseRequest } from "~/util";

export async function action({ request }: ActionArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("feedback"),
        method: "POST",
        body: await parseRequest(request),
    });
}

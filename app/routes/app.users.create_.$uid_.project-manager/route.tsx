import { ActionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";

export async function action({ request, params }: ActionArgs) {
    invariant(params.uid);
    console.log(params.uid)
    return await sendRequest(request, {
        url: getServiceUrl("users", "create-project-manager", params.uid),
        method: "POST",
    });
}

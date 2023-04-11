import { FormResponse } from "@math865a/project-tool.types";
import { ActionArgs } from "@remix-run/node";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { parseRequest } from "~/util";

export async function action({ request }: ActionArgs): Promise<FormResponse> {
    return await sendRequest(request, {
        url: getServiceUrl("resourcePortfolio"),
        method: "POST",
        body: await parseRequest(request),
    });
}

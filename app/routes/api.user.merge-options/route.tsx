import { LoaderArgs } from "@remix-run/node";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { IUserConnectOption } from "../app.users.create/form";

export async function loader({
    request,
}: LoaderArgs): Promise<IUserConnectOption[]> {
    return await sendRequest(request, {
        url: getServiceUrl("users", "merge-options"),
        method: "GET",
    });
}


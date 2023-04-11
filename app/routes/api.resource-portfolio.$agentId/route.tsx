import { FormResponse } from "@math865a/project-tool.types";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";

export interface IDeletionConsequence {
    id: string;
    name: string;
    systematicName: string;
    allocations: IDeletionAllocation[];
    totalWork: string;
}

export interface IDeletionAllocation {
    taskName: string;
    startDate: string;
    endDate: string;
    hours: string;
}
export async function loader({
    request,
    params,
}: LoaderArgs): Promise<IDeletionConsequence[]> {
    invariant(params.agentId);
    return await sendRequest(request, {
        url: getServiceUrl(
            "resourcePortfolio",
            "delete-consequences",
            params.agentId
        ),
        method: "GET",
    });
}

export async function action({
    request,
    params,
}: ActionArgs): Promise<FormResponse> {
    invariant(params.agentId);
    return await sendRequest(request, {
        url: getServiceUrl("resourcePortfolio", params.agentId),
        method: "DELETE",
    });
}

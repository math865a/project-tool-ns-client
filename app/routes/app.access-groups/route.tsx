import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { Fallback, Page } from "~/src/design-system";
import GridSection from "./Grid.Section";
import HeaderSection from "./Header.Section";
import { useRowState } from "./hooks/useRowState";
import { Action, Can, FormResponse, Subject } from "~/src";
import { AccessGroupRow, AccessGroupsViewData } from "./definitions/types";
import { parseRequest } from "~/util/formData";
import BackAction from "~/src/layout/topbar/BackAction";

export const handle = {
    BackAction: <BackAction title="Adgangsgrupper" noBack />,
};

export async function loader({
    request,
}: LoaderArgs): Promise<AccessGroupsViewData> {
    return await sendRequest(request, {
        url: getServiceUrl("accessGroups"),
        method: "GET",
    });
}

export type AccessGroupsLoader = typeof loader;

export async function action({ request }: ActionArgs): Promise<FormResponse> {
    if (request.method === "PUT") {
        return await sendRequest(request, {
            url: getServiceUrl("accessGroups"),
            method: "POST",
            body: await parseRequest(request),
        });
    } else if (request.method === "POST") {
        const body = await parseRequest<AccessGroupRow>(request);
        return await sendRequest(request, {
            url: getServiceUrl("accessGroups", body.id),
            method: "POST",
            body: body,
        });
    } else if (request.method === "DELETE") {
        const body = await parseRequest<{ id: string }>(request);
        return await sendRequest(request, {
            url: getServiceUrl("accessGroups", body.id),
            method: "DELETE",
        });
    }
    throw new Error("Invalid request method");
}

export default function View() {
    const rowState = useRowState();

    return (
        <Can I={Action.Read} a={Subject.AccessGroups} passThrough>
            {(allowed) =>
                allowed ? (
                    <Page.Root maxWidth="xl">
                        <Page.Layout>
                            <HeaderSection
                                handleCreateClick={rowState.handleCreateClick}
                            />
                            <GridSection {...rowState} />
                        </Page.Layout>
                    </Page.Root>
                ) : (
                    <Fallback.AccessDenied />
                )
            }
        </Can>
    );
}

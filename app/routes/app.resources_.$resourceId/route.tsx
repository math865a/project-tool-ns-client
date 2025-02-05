import { Outlet } from "@remix-run/react";
import { HasAccess, ResourceProfile, Subject } from "~/src";
import { Page } from "~/src/design-system";
import HeaderSection from "./Header.Section";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { sendRequest } from "~/session.server";
import { getServiceUrl } from "~/server";

export async function loader({
    request,
    params,
}: LoaderArgs): Promise<ResourceProfile> {
    invariant(params.resourceId);
    return await sendRequest(request, {
        url: getServiceUrl("resources", params.resourceId),
        method: "GET",
    });
}

export type ResourceLoader = typeof loader;

export async function action({ request, params }: ActionArgs) {
    invariant(params.resourceId);
    if (request.method === "DELETE") {
        const result: any = await sendRequest(request, {
            url: getServiceUrl("resources", params.resourceId),
            method: "DELETE",
        });
        if (result.status === "ok") {
            return redirect("/app/resources", { status: 303 });
        }
        return json(result);
    }
    throw new Error("Invalid method");
}

export default function Resource() {
    return (
        <HasAccess to={Subject.Resources}>
            <Page.Root maxWidth="xl">
                <Page.Layout>
                    <HeaderSection />
                    <Outlet />
                </Page.Layout>
            </Page.Root>
        </HasAccess>
    );
}

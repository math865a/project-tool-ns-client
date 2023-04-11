import { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Page } from "design";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { HasAccess, Subject } from "~/src";
import BackAction from "~/src/layout/topbar/BackAction";
import GridSection from "./Grid.Section";
import HeaderSection from "./Header.Section";

export const handle = {
    BackAction: <BackAction title="Ressourcetyper" noBack />,
};

export async function loader({ request }: LoaderArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("resourceTypes"),
        method: "GET",
    });
}

export type ResourceTypesLoader = typeof loader;

export default function ResourceTypesView() {
    return (
        <HasAccess to={Subject.ResourceTypes}>
            <Page.Root>
                <Page.Layout>
                    <HeaderSection />
                    <GridSection />
                </Page.Layout>
                <Outlet />
            </Page.Root>
        </HasAccess>
    );
}

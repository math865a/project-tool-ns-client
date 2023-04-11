import { json, LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Page } from "design";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { Action as A, Subject } from "~/src/_definitions";
import { Fallback } from "~/src/design-system";
import HeaderSection from "./Header.Section";
import GridSection from "./Grid.Section";
import { Can, HasAccess } from "~/src";
import BackAction from "~/src/layout/topbar/BackAction";

export const handle = {
    BackAction: <BackAction title="Ressourcer" noBack />,
};

export async function loader({ request }: LoaderArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("resources"),
        method: "GET",
    });
}

export default function ResourcesView() {
    return (
        <HasAccess to={Subject.Resources}>
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

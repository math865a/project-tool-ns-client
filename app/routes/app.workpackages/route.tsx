import { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Page } from "design";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { HasAccess } from "~/src";
import { Subject } from "~/src/_definitions";
import BackAction from "~/src/layout/topbar/BackAction";
import GridSection from "./Grid.Section";
import HeaderSection from "./Header.Section";

export const handle = {
    BackAction: <BackAction title="Arbejdspakker" noBack />,
};

export async function loader({ request }: LoaderArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("workpackages"),
        method: "GET",
    });
}

export type WorkpackagesLoader = typeof loader;

export default function WorkpackagesView() {
    return (
        <HasAccess to={Subject.Workpackages}>
            <Page.Root maxWidth="xl">
                <Page.Layout>
                    <HeaderSection />
                    <GridSection />
                </Page.Layout>
                <Outlet />
            </Page.Root>
        </HasAccess>
    );
}

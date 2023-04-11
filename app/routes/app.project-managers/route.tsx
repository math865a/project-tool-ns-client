import { LoaderArgs } from "@remix-run/node";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { Page } from "~/src/design-system";
import GridSection from "./Grid.Section";
import HeaderSection from "./Header.Section";
import { IProjectManagerRow } from "./grid/types";
import BackAction from "~/src/layout/topbar/BackAction";
import { HasAccess, Subject } from "~/src";

export const handle = {
    BackAction: <BackAction title="Projektledere" noBack />,
};

export async function loader({
    request,
}: LoaderArgs): Promise<IProjectManagerRow[]> {
    return await sendRequest(request, {
        url: getServiceUrl("projectManager"),
        method: "GET",
    });
}
export type ProjectManagersLoader = typeof loader;

export default function ProjectManagersPage() {
    return (
        <HasAccess to={Subject.ProjectManagers}>
            <Page.Root maxWidth="md">
                <Page.Layout>
                    <HeaderSection />
                    <GridSection />
                </Page.Layout>
            </Page.Root>
        </HasAccess>
    );
}

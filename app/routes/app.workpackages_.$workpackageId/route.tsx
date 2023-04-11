import { FormResponse } from "@math865a/project-tool.types";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Outlet, useRouteLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { sendRequest } from "session";
import { SocketProvider } from "socket";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { HasAccess, Subject, WorkpackageProfile } from "~/src";
import { Page } from "~/src/design-system";
import BackAction from "~/src/layout/topbar/BackAction";
import { WorkpackageProvider } from "~/src/state";
import DetailsSection from "./Details.Section";
import HeaderSection from "./Header.Section";
import PlanningSection from "./Planning.Section";
import StatusSection from "./Status.Section";
import WorkBreakdownsSection from "./WorkBreakdown.Section";
import WorkTimesseriesSection from "./WorkTimeseries.Section";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const data = useRouteLoaderData(
        "routes/app.workpackages_.$workpackageId"
    ) as any;
    return (
        <BackAction
            title={data.node.systematicName}
            backTo="/app/workpackages"
        />
    );
}

export async function loader({
    params,
    request,
}: LoaderArgs): Promise<WorkpackageProfile> {
    invariant(params.workpackageId);
    return await sendRequest(request, {
        url: getServiceUrl("workpackages", params.workpackageId),
        method: "GET",
    });
}

export type WorkpackageLoader = typeof loader;

export async function action({ params, request }: LoaderArgs) {
    invariant(params.workpackageId);

    if (request.method === "DELETE") {
        const result: FormResponse = await sendRequest(request, {
            url: getServiceUrl("workpackages", params.workpackageId),
            method: "DELETE",
        });
        if (result.status === "ok") {
            return redirect("..");
        }
        return json(result);
    }
}

export default function Workpackage() {
    return (
        <HasAccess to={Subject.Workpackages}>
            <ClientOnly>
                {() => (
                    <SocketProvider namespace="projectManagement">
                        <WorkpackageProvider>
                            <Page.Root maxWidth="lg">
                                <Page.Layout>
                                    <HeaderSection />
                                    <DetailsSection />
                                    <StatusSection />
                                    <PlanningSection />
                                    <WorkBreakdownsSection />
                                    <WorkTimesseriesSection />

                                    <Outlet />
                                </Page.Layout>
                            </Page.Root>
                        </WorkpackageProvider>
                    </SocketProvider>
                )}
            </ClientOnly>
        </HasAccess>
    );
}

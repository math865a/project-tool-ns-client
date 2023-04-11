import { FinancialSourceViewRow } from "@math865a/project-tool.types";
import { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Page } from "design";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { HasAccess } from "~/src";
import { Subject } from "~/src/_definitions";
import BackAction from "~/src/layout/topbar/BackAction";
import CardsSection from "./Cards";
import HeaderSection from "./Header";

export const handle = {
    BackAction: <BackAction title="Finanskilder" noBack />,
};

export async function loader({
    request,
}: LoaderArgs): Promise<FinancialSourceViewRow[]> {
    return await sendRequest(request, {
        url: getServiceUrl("financialSources"),
        method: "GET",
    });
}
export type FinancialSourcesLoader = typeof loader;

export default function FinancialSourcesView() {
    return (
        <HasAccess to={Subject.FinancialSources}>
            <Page.Root maxWidth="md">
                <Page.Layout>
                    <HeaderSection />
                    <CardsSection />
                </Page.Layout>
                <Outlet />
            </Page.Root>
        </HasAccess>
    );
}

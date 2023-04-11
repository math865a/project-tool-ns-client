import { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Page } from "design";
import { sendRequest } from "session";
import { getServiceUrl } from "~/server";
import { HeaderSection } from "./Header.Section";
import { CardsSection } from "./Cards.Section";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { Fallback } from "~/src/design-system";
import { ContractViewRow } from "@math865a/project-tool.types";
import BackAction from "~/src/layout/topbar/BackAction";
import { HasAccess } from "~/src";

export const handle = {
    BackAction: <BackAction title="Kontrakter" noBack />,
};

export async function loader({
    request,
}: LoaderArgs): Promise<ContractViewRow[]> {
    return await sendRequest(request, {
        url: getServiceUrl("contracts"),
        method: "GET",
    });
}
export type ContractsLoader = typeof loader;
export default function ContractsView() {
    return (
        <HasAccess to={Subject.Contracts}>
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

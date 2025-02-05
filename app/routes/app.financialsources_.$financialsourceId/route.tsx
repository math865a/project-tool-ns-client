import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { Page } from "design";
import { sendRequest } from "session";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { FinancialSourceProfile, HasAccess, Subject } from "~/src";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest } from "~/util/formData";
import DetailsSection from "./Details.Section";
import HeaderSection from "./Header.Section";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const { node } = useRouteLoaderData(
        "routes/app.financialsources_.$financialsourceId"
    ) as FinancialSourceProfile;
    return <BackAction title={node.name} backTo="/app/financialsources" />;
}

export async function loader({ params, request }: LoaderArgs) {
    invariant(params.financialsourceId);
    return await sendRequest(request, {
        url: getServiceUrl("financialSources", params.financialsourceId),
        method: "GET",
    });
}

export async function action({ request, params }: ActionArgs) {
    invariant(params.financialsourceId);

    if (request.method === "DELETE") {
        await sendRequest(request, {
            url: getServiceUrl("financialSources", params.financialsourceId),
            method: "DELETE",
        });
        return redirect("..");
    } else if (request.method === "POST") {
        return await sendRequest(request, {
            url: getServiceUrl("financialSources", params.financialsourceId),
            method: "POST",
            body: await parseRequest(request),
        });
    }
    return json(null);
}

export default function FinancialSourceProfilePage() {
    return (
        <HasAccess to={Subject.FinancialSources}>
            <Page.Root>
                <Page.Layout>
                    <HeaderSection />
                    <DetailsSection />
                </Page.Layout>
            </Page.Root>
        </HasAccess>
    );
}

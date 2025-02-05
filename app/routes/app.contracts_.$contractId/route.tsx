import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Page } from "design";
import { sendRequest } from "session";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest } from "~/util/formData";
import { HeaderSection } from "./Header.Section";
import { DetailsSection } from "./Details.Section";
import { useRouteLoaderData } from "@remix-run/react";
import { ContractProfile, FormResponse, HasAccess, Subject } from "~/src";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const { node } = useRouteLoaderData(
        "routes/app.contracts_.$contractId"
    ) as ContractProfile;

    return <BackAction title={node.name} backTo="/app/contracts" />;
}

export async function loader({ params, request }: LoaderArgs) {
    invariant(params.contractId);
    return await sendRequest(request, {
        url: getServiceUrl("contracts", params.contractId),
        method: "GET",
    });
}

export type ContractLoader = typeof loader;

export async function action({ params, request }: ActionArgs) {
    invariant(params.contractId);
    if (request.method === "DELETE") {
        const result: FormResponse = await sendRequest(request, {
            url: getServiceUrl("contracts", params.contractId),
            method: "DELETE",
        });
        if (result.status === "ok") {
            return redirect("..");
        }
        return json(result);
    } else if (request.method === "POST") {
        return await sendRequest(request, {
            url: getServiceUrl("contracts", params.contractId),
            method: "POST",
            body: await parseRequest(request),
        });
    }
    return json(null);
}

export default function ContractProfilePage() {
    return (
        <HasAccess to={Subject.Contracts}>
            <Page.Root>
                <Page.Layout>
                    <HeaderSection />
                    <DetailsSection />
                </Page.Layout>
            </Page.Root>
        </HasAccess>
    );
}

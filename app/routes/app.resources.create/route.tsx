import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sendRequest } from "session";

import { getServiceUrl } from "~/server";
import { IResourceFormOptons, ResourceForm } from "~/src/components/forms";
import { parseRequest } from "~/util/formData";
import { FormResponse } from "~/src";

export async function loader({
    request,
}: LoaderArgs): Promise<IResourceFormOptons> {
    return await sendRequest(request, {
        url: getServiceUrl("resources", "create-form-options"),
        method: "GET",
    });
}

export async function action({ request }: ActionArgs) {
    const result: FormResponse = await sendRequest(request, {
        url: getServiceUrl("resources"),
        method: "POST",
        body: await parseRequest(request),
    });
    if (result.status === "ok") {
        return redirect(`../${result.id}`);
    }
    return json(result);
}

export type CreateResourceLoader = typeof loader;

export default function Page() {
    const options = useLoaderData<CreateResourceLoader>();
    return <ResourceForm options={options} />;
}

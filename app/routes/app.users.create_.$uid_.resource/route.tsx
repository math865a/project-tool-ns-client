import { FormResponse } from "@math865a/project-tool.types";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useForm } from "react-hook-form";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { IResourceFormOptons, ResourceForm } from "~/src/components/forms";
import { Dialog } from "~/src/design-system";
import { parseRequest } from "~/util/formData";

export async function loader({ request, params }: LoaderArgs): Promise<{
    options: IResourceFormOptons;
    base: { id: string; name: string; color: string } | undefined;
}> {
    invariant(params.uid);
    return await sendRequest(request, {
        url: getServiceUrl("users", "resource-form", params.uid),
        method: "GET",
    });
}

export async function action({ request, params }: ActionArgs) {
    invariant(params.uid);
    const result: FormResponse = await sendRequest(request, {
        url:  getServiceUrl("resources"),
        method: "POST",
        body: await parseRequest(request),
    });
    if (result.status === "ok"){
        return redirect("../")
    }
    return json(result);
}

export default function CreateResourceProfileForm() {
    const data = useLoaderData<typeof loader>();

    return (
        <ResourceForm
            {...data}
            title={
                data.base
                    ? `Opret ${data.base.name} som ressource`
                    : `Opret ressource`
            }
            closeTo="/app/users"
        />
    );
}

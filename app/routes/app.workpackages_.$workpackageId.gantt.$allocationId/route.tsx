import { LoaderArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { EditValues } from "./dialog/definitions/types";
import { AllocationDialog } from "./dialog";

export async function loader({ params, request }: LoaderArgs) {
    const { workpackageId, allocationId } = params;
    invariant(workpackageId, allocationId);

    const data: EditValues = await sendRequest(request, {
        url: getServiceUrl("workpackages", "allocation", allocationId),
        method: "GET",
    });

    return json(data);
}

export default function AllocationDialogPage() {
    return <AllocationDialog />;
}

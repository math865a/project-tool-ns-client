import { useParams, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ResourceProfile } from "~/src";
import { Calendar } from "~/src/features";
import BackAction from "~/src/layout/topbar/BackAction";

export const handle = {
    BackAction: <PageContext/>
}

function PageContext(){
    const { node } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;
    return (
        <BackAction
            title={`${node.name} - Kalender`}
            backTo={`/app/resources/${node.id}`}
        />
    );

}

export default function ResourceCalendar() {
    const { resourceId } = useParams();
    invariant(resourceId);
    return <Calendar resourceId={resourceId} />;
}

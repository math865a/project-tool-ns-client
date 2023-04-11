import {
    ResourceProfile,
    TimelineWorkpackageJson,
} from "@math865a/project-tool.types";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Page } from "design";
import { ClientOnly } from "remix-utils";
import { sendRequest } from "session";
import invariant from "tiny-invariant";
import BackAction from "~/src/layout/topbar/BackAction";
import TimelineDragProvider from ".//task-timeline/components/drag";
import TaskTimelineGrid from ".//task-timeline/task-timeline";
import TimelineProvider from "./task-timeline/task-timeline.provider";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const { node } = useRouteLoaderData(
        "routes/app/resources/$resourceId"
    ) as ResourceProfile;
    return <BackAction title={node.name + " - tidslinje"} />;
}

export async function loader({ params, request }: LoaderArgs) {
    invariant(params.resourceId);
    const data = await sendRequest(request, {
        url: "resource-mgmt/resources/task-timeline/" + params.resourceId,
        method: "GET",
    });
    return json(data);
}

export default function Tasks() {
    const data = useLoaderData<TimelineWorkpackageJson[]>();

    return (
        <TimelineProvider workpackages={data}>
            <Page.Root maxWidth="xl">
                <Page.Layout>
                    <ClientOnly>
                        {() => (
                            <TimelineDragProvider>
                                <TaskTimelineGrid />
                            </TimelineDragProvider>
                        )}
                    </ClientOnly>
                </Page.Layout>
            </Page.Root>
        </TimelineProvider>
    );
}

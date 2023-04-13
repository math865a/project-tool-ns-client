import { useParams, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ResourceProfile } from "~/src";
import { Tasks } from "~/src/features";
import BackAction from "~/src/layout/topbar/BackAction";
import { Divider, Box } from "@mui/material";
import { useSession } from "~/src";
import { Page, Pagebar } from "~/src/design-system";

export const handle = {
    BackAction: <PageContext />,
};

function PageContext() {
    const { node } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;
    return (
        <BackAction
            title={`${node.name} - Opgaver`}
            backTo={`/app/resources/${node.id}`}
        />
    );
}

export default function TasksPage() {
    const { resourceId } = useParams();
    invariant(resourceId);

    return (
        <Page.SubLayout>
            <Divider />
            <Box flexGrow={1} pt={4} height={"80vh"}>
                <Tasks resourceId={resourceId} />{" "}
            </Box>
        </Page.SubLayout>
    );
}

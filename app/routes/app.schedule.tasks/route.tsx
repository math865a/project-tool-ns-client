import { Divider, Box } from "@mui/material";
import { useSession } from "~/src";
import { Page, Pagebar } from "~/src/design-system";
import { Tasks } from "~/src/features";

export default function TasksPage() {
    const {
        user: { uid },
    } = useSession();

    return (
        <Page.SubLayout>
            <Divider />
            <Box flexGrow={1} pt={4} height={"80vh"}>
                <Tasks resourceId={uid} />;
            </Box>
        </Page.SubLayout>
    );
}

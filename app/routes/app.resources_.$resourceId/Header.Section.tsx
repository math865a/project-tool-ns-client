import { Box, Stack } from "@mui/material";
import { useParams } from "@remix-run/react";
import { Directory, Page } from "design";
import invariant from "tiny-invariant";
import {
    AddUserAction,
    DeleteAction,
    FavoriteAction,
    useLinks
} from "./header";

export default function HeaderSection() {
    const { resourceId } = useParams();
    invariant(resourceId);

    const links = useLinks();

    return (
        <Page.Header>
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Directory.PageLinks links={links} />
                <Stack direction="row" spacing={1} alignItems="center">
                    <AddUserAction />
                    <FavoriteAction />
                    <DeleteAction />
                </Stack>
            </Box>
        </Page.Header>
    );
}

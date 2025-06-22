import { Box, Stack } from "@mui/material";
import { useParams } from "@remix-run/react";
import { Page } from "design";
import invariant from "tiny-invariant";
import { DeleteAction, FavoriteAction, PageLink, useLinks } from "./header";

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
                <Stack display="flex" direction="row" spacing={1}>
                    {links.map((d) => (
                        <PageLink {...d} key={d.to} />
                    ))}
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    {/*   <AddUserAction />*/}
                    <FavoriteAction />
                    <DeleteAction />
                </Stack>
            </Box>
        </Page.Header>
    );
}

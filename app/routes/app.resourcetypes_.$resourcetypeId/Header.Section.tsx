import { Box, Stack } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { Page } from "design";
import { ResourceTypeDeleteAction } from "./header-section/DeleteAction";
import ResourceTypeTags from "./header-section/Tags";
import { ResourceTypeLoader } from "./route";

export default function HeaderSection() {
    const {
        node: { id },
    } = useLoaderData<ResourceTypeLoader>();

    return (
        <Page.Header>
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <ResourceTypeTags />
                <Stack direction="row" spacing={1} alignItems="center">
                    <ResourceTypeDeleteAction />
                </Stack>
            </Box>
        </Page.Header>
    );
}

import { Box, Stack } from "@mui/material";
import { Page } from "design";
import { DeleteAction } from "./header";

export default function HeaderSection() {
    return (
        <Page.Header>
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box />
                <Stack direction="row" spacing={1} alignItems="center">
                    <DeleteAction  />
                </Stack>
            </Box>
        </Page.Header>
    );
}



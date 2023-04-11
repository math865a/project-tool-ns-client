import { Box, Stack } from "@mui/material";
import { Page } from "design";
import { DeleteAction, FavoriteAction, Tags } from "./header";

export default function HeaderSection() {

    return (
        <Page.Header>
            <Box
                flexGrow={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Tags/>
           
                <Stack direction="row" spacing={1} alignItems="center">
                    <FavoriteAction/>
                    <DeleteAction />
                </Stack>
            </Box>
        </Page.Header>
    );
}
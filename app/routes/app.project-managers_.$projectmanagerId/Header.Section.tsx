import { Stack } from "@mui/material";
import { Page } from "design";
import { AddUserAction, DeleteAction, ToggleResourceAction } from "./header";

export default function HeaderSection() {
    return (
        <Page.Header
            actions={
                <Stack direction="row" spacing={2} alignItems="center">
                    <ToggleResourceAction />
                    <AddUserAction />
                    <DeleteAction />
                </Stack>
            }
        />
    );
}

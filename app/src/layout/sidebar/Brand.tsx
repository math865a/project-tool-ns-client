import { Toolbar, Stack, Typography } from "@mui/material";
import { Logo } from "~/src/design-system";

export default function Brand() {
    return (
        <Toolbar>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
                <Typography fontSize={18} fontWeight="bold">
                    Project Tool
                </Typography>
            </Stack>
        </Toolbar>
    );
}

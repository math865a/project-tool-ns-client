import { Box, Divider, Drawer, Typography } from "@mui/material";
import { LoaderArgs, json, redirect } from "@remix-run/node";
import {
    Outlet,
    useMatches
} from "@remix-run/react";
import { Layout } from "design";
import { getAccessToken } from "../../session.server";

export async function loader({ request }: LoaderArgs) {
    const token = await getAccessToken(request);
    if (token) {
        return redirect("/app");
    }
    return json({});
}
const drawerWidth = 400;
export default function AuthOutlet() {
    const title = useTitle();

    return (
        <Layout.Root>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                    },
                }}
                PaperProps={{
                    variant: "outlined",
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: "15%",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box width="100%" px={6}>
                    <Typography fontWeight={800} fontSize={20} pb={1}>
                        {title}
                    </Typography>
                    <Divider />
                    <Box flexGrow={1} pt={2}>
                        <Outlet />
                    </Box>
                </Box>
            </Drawer>

            <Layout.Main position="relative">
                <Box
                    position="absolute"
                    left={0}
                    right={0}
                    top={0}
                    bottom={0}
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.light,
                    }}
                />
            </Layout.Main>
        </Layout.Root>
    );
}

const useTitle = () => {
    const matches = useMatches();
    const header = matches.filter((d) => d.handle?.["Title"])[0];
    return header?.handle?.["Title"](header);
};

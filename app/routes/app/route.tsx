import { Toolbar } from "@mui/material";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Layout } from "design";
import { getServiceUrl } from "~/server";
import { SessionData } from "~/src/_definitions";
import Topbar from "~/src/layout/topbar";
import { SessionContextProvider } from "~/src/session-user";
import { logout, requireAuth, sendRequest } from "../../session.server";
import Sidebar from "../../src/layout/sidebar";
import { NotificationsProvider } from "~/src";

export async function loader({ request }: LoaderArgs) {
    const token = await requireAuth(request);
    try {
        const data: SessionData = await sendRequest(request, {
            url: getServiceUrl("userService", "session"),
            method: "GET",
        });
        if (data.user.isDeactivated) {
            throw await logout(request);
        }
        console.log(data);

        return json({
            ...data,
            token: token.access_token,
        });
    } catch (e) {
        console.log("error", e);
        return await logout(request);
    }
}

export async function action({ request }: ActionArgs) {
    return await logout(request);
}

const drawerWidth = 225;
export default function App() {
    return (
        <Layout.Root>
            <NotificationsProvider>
                <SessionContextProvider>
                    <Topbar drawerWidth={drawerWidth} />
                    <Sidebar drawerWidth={drawerWidth} />
                    <Layout.Main ml={drawerWidth + "px"}>
                        <Toolbar />
                        <Outlet />
                    </Layout.Main>
                </SessionContextProvider>
            </NotificationsProvider>
        </Layout.Root>
    );
}

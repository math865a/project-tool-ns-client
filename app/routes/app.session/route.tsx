import { ActionArgs } from "@remix-run/node";
import { logout } from "~/session.server";
import { Outlet } from "@remix-run/react";
import { Page } from "design";

export async function action({ request }: ActionArgs) {
    return await logout(request, "/login");
}

export default function User() {
    return (
        <Page.Root maxWidth="sm">
            <Page.Layout>
                <Outlet />
            </Page.Layout>
        </Page.Root>
    );
}

import { Outlet, useNavigate } from "@remix-run/react";
import { Page } from "~/src/design-system";
import BackAction from "~/src/layout/topbar/BackAction";
import HeaderSection from "./Header.Section";
import { useSession } from "~/src";

export const handle = {
    BackAction: <BackAction title="Mit skema" noBack />,
};

export default function Schedule() {

    const {user} = useSession();

    const navigate = useNavigate()

    if (!user.isResource){
        navigate(-1)
    }


    return (
        <Page.Root maxWidth="xl">
            <Page.Layout>
                <HeaderSection />
                <Outlet />
            </Page.Layout>
        </Page.Root>
    );
}

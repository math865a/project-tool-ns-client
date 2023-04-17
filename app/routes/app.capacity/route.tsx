import { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { sendRequest } from "session";
import CapacityBoard from "~/pages/capacity";
import { getServiceUrl } from "~/server";
import { Action as A, Subject } from "~/src/_definitions";
import { Fallback, Page } from "~/src/design-system";
import BackAction from "~/src/layout/topbar/BackAction";
import { Can } from "~/src/session-user";

export const handle = {
    BackAction: <BackAction title="Kapacitet" noBack/>
}

export async function loader({ request }: LoaderArgs) {
    return await sendRequest(request, {
        url: getServiceUrl("capacityBoard", "rows"),
        method: "GET",
    });
}

export default function CapacityBoardPage() {
    return (
        <Can I={A.Read} a={Subject.Capacity} passThrough>
            {(allowed) =>
                allowed ? (
                    <Page.Root maxWidth="xl">
                        <Page.Layout>
                            <CapacityBoard />
                            <Outlet/>
                        </Page.Layout>
                    </Page.Root>
                ) : (
                    <Fallback.AccessDenied />
                )
            }
        </Can>
    );
}

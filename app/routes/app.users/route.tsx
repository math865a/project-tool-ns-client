import { Outlet, ShouldRevalidateFunction } from "@remix-run/react";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { namedAction } from "remix-utils";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { Action, Can, HasAccess, Subject } from "~/src";
import { Fallback, Page } from "~/src/design-system";
import BackAction from "~/src/layout/topbar/BackAction";
import { parseRequest } from "~/util/formData";
import GridSection from "./Grid.Section";
import HeaderSection from "./Header.Section";
import { IUsersLoaderData, UserRow } from "./definitions";
import v from "voca"

export const handle = {
    BackAction: <BackAction title="Brugere" noBack />,
};

export async function loader({
    request,
}: LoaderArgs): Promise<IUsersLoaderData> {
    return await sendRequest(request, {
        url: getServiceUrl("users"),
        method: "GET",
    });
}

export type UsersLoader = typeof loader;

export async function action({ request }: ActionArgs) {
    return namedAction(request, {
        async update() {
            const body = await parseRequest<UserRow>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", body.uid),
                method: "POST",
                body: body,
            });
        },
        async deleteUser() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", body.uid),
                method: "DELETE",
            });
        },
        async createProjectManager() {
            const body = await parseRequest<UserRow>(request);
            return await sendRequest(request, {
                url: getServiceUrl("projectManager"),
                method: "POST",
                body: {
                    id: body.uid,
                    name: body.name,
                    color: body.color,
                },
            });
        },
        async deleteProjectManager() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("projectManager", body.uid),
                method: "DELETE",
            });
        },
        async deactivate() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", "deactivate", body.uid),
                method: "POST",
            });
        },
        async activate() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", "activate", body.uid),
                method: "POST",
            });
        },
        async mailWelcome() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", "welcome", body.uid),
                method: "POST",
            });
        },
        async resetPassword() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", "reset-password", body.uid),
                method: "POST",
            });
        },
        async mailCredentials() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", "mail-credentials", body.uid),
                method: "POST",
            });
        },
        async deleteResourceProfile() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("resources", body.uid),
                method: "DELETE",
            });
        },
        async split() {
            const body = await parseRequest<{ uid: string }>(request);
            return await sendRequest(request, {
                url: getServiceUrl("users", "split"),
                method: "POST",
                body: {
                    id: body.uid,
                },
            });
        },
        async merge() {
            return await sendRequest(request, {
                url: getServiceUrl("users", "merge"),
                method: "POST",
                body: await parseRequest(request),
            });
        },
    });
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
    defaultShouldRevalidate,
    ...props
}) => {
    const split = v.split(props.formAction, "?/")
    if (split.length > 1){
        return false;
    }
    return defaultShouldRevalidate;
};

export default function UsersView() {
    return (
        <HasAccess to={Subject.Users}>
            <Page.Root maxWidth="xl">
                <Page.Layout>
                    <HeaderSection />
                    <GridSection />
                    <Outlet />
                </Page.Layout>
            </Page.Root>
        </HasAccess>
    );
}

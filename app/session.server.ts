import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { Duration as dur } from "luxon";
import { FormErrorResponse, JwtHeader, SignedJwtToken } from "~/src";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        path: "/",
        sameSite: "lax",
        secrets: ["3Aa&q!$-{~G7tiiUZnJU+UX%nM]za<"],
    },
});

const SESSION_KEY = "access_token";

export async function getSession(request: Request) {
    const cookie = request.headers.get("cookie");
    return sessionStorage.getSession(cookie);
}

export async function getAccessToken(
    request: Request
): Promise<JwtHeader | undefined> {
    const session = await getSession(request);
    if (!session) return undefined;
    const token = session.get(SESSION_KEY);
    if (!token) {
        return undefined;
    }
    return new JwtHeader(token);
}

export async function requireAuth(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const acessToken = await getAccessToken(request);
    if (!acessToken) {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
        throw redirect(`/login?${searchParams}`);
    }
    return acessToken;
}

export async function createSession({
    request,
    jwtToken,
    remember = true,
    redirectTo,
}: {
    request: Request;
    jwtToken: SignedJwtToken;
    remember?: boolean;
    redirectTo: string;
}) {
    const session = await getSession(request);
    if (!session)
        return json(new FormErrorResponse({ message: "Der skete en fejl" }));
    session.set(SESSION_KEY, jwtToken.access_token);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session, {
                maxAge: remember
                    ? dur.fromObject({ months: 1 }).toMillis()
                    : undefined,
            }),
        },
    });
}

export async function logout(request: Request, redirectTo?: string) {
    const session = await getSession(request);
    if (!session) return;
    return redirect(`/login${redirectTo ? "?" + redirectTo : ""}`, {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
}

export async function sendRequest<T = any>(
    request: Request,
    props: Omit<ISendRequestProps, "headers" | "request">
) {
    const accessToken = await getAccessToken(request);
    return await sendAPIRequest<T>({
        ...props,
        headers: accessToken,
        request: request,
    });
}

export interface ISendRequestProps {
    url: string;
    method?: RequestInit["method"];
    useCredentials?: boolean;
    body?: { [index: string]: any };
    headers?: { [index: string]: any };
    queryParams?: { [index: string]: any };
    ignoreUnauthorized?: boolean;
    request: Request;
}

async function sendAPIRequest<T = any>({
    url,
    method = "GET",
    useCredentials = false,
    body,
    headers = {},
    queryParams = {},
    ignoreUnauthorized = false,
    request,
}: ISendRequestProps): Promise<T> {
    const options: { [index: string]: any } = {
        method: method,
        headers: new Headers({
            "content-type": "application/json",
            ...headers,
        }), // by default setting the content-type to be json type
        body: body ? JSON.stringify(body) : null,
    };
    if (useCredentials) options["credentials"] = "include";
    if (queryParams) {
        url = `${url}?${new URLSearchParams(queryParams).toString()}`;
    }

    return fetch(url, options).then(async (res) => {
        if (res.ok) {
            return res.json() as T;
        } /*else if (res.status === 401 && !ignoreUnauthorized) {
            const searchParams = new URLSearchParams([
                ['redirectTo', new URL(request.url).pathname],
            ]);
            throw await logout(request, searchParams.toString());
        }*/ else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error
                return Promise.reject({
                    status: res.status,
                    ok: false,
                    message: json.message,
                    body: json,
                });
            });
        }
    });
}

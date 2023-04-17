import { useParams, useSearchParams } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import { useEffect } from "react";
import { promiseHash } from "remix-utils";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { Grid, Page } from "~/src/design-system";

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    return json(
        await promiseHash({
            rows: sendRequest(request, {
                url: getServiceUrl(
                    "activity",
                    params.get("page") ?? "0",
                    params.get("pageSize") ?? "30"
                ),
            }),
            count: sendRequest(request, {
                url: getServiceUrl("activity", "count"),
            }),
        })
    );
}

export default function Activities() {
    const [params, setParams] = useSearchParams();

    return null;
}

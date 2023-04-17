import { Box, Menu } from "@mui/material";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
    invariant(params.rowId);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (!startDate || !endDate) {
        throw new Error("Invalid query params");
    }

    return await sendRequest(request, {
        url: getServiceUrl(
            "capacityBoard",
            params.rowId,
            `${startDate}/${endDate}`
        ),
        method: "GET",
    });
}

export default function CapacityDetail() {
    const navigate = useNavigate();
    const data = useLoaderData()
    console.log(data);

    const [params] = useSearchParams();

    const anchorPosition = useMemo(() => {
        return {
            top: Number(params.get("top")),
            left: Number(params.get("left")),
        }
    },[params])

    return (
        <Menu
            open
            anchorPosition={anchorPosition}
            anchorReference="anchorPosition"
            onClose={() => navigate("/app/capacity")}
        >
            <Box height={200} width={200} bgcolor="primary.main" />
        </Menu>
    );
}


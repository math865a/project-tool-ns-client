import { Unstable_Grid2 as Grid } from "@mui/material";
import { Outlet } from "@remix-run/react";
import DetailsSection from "./Details.Section";
import PlanningSection from "./Planning.Section";
import StatsSection from "./Stats.Section";
import StatusSection from "./Status.Section";
import WorkBreakdownsSection from "./WorkBreakdown.Section";
import WorkTimesseriesSection from "./WorkTimeseries.Section";
import { FormResponse } from "@math865a/project-tool.types";
import { LoaderArgs, redirect, json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { parseRequest } from "~/util";
import WorkLoadSection from "./WorkLoad.Section";

export async function action({ params, request }: LoaderArgs) {
    invariant(params.workpackageId);

    if (request.method === "POST") {
        return await sendRequest(request, {
            url: getServiceUrl("workpackages", params.workpackageId),
            method: "POST",
            body: await parseRequest(request),
        });
    }
    throw new Error("Method not allowed");
}

export default function Index() {
    return (
        <>
            <DetailsSection />
            <StatusSection />
            <StatsSection />
            <WorkLoadSection/>
            <Grid xs={6} sx={{ p: 0 }}>
                <Grid container></Grid>
            </Grid>

            <PlanningSection />
            <WorkBreakdownsSection />
            <WorkTimesseriesSection />
            <Outlet />
        </>
    );
}

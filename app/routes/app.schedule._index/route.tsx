import { LoaderArgs } from "@remix-run/node";
import { getServiceUrl } from "~/server";
import { sendRequest } from "~/session.server";
import { IRawTask, SummaryView } from "~/src";
import BackAction from "~/src/layout/topbar/BackAction";
import DeadlinesSection from "./Deadlines.Section";
import DistributionSection from "./Distribution.Section";
import TasksSection from "./Tasks.Section";
import { ScheduleSummaryProvider } from "./_state";



export async function loader({ request }: LoaderArgs): Promise<IRawTask[]> {
    const url = new URL(request.url);
    const view = url.searchParams?.get("view") ?? SummaryView.Short;
    return await sendRequest(request, {
        url: getServiceUrl("schedule", "summary", view),
        method: "GET",
    });
}

export type ScheduleSummaryLoader = typeof loader;

export default function SummaryPage() {
    return (
        <ScheduleSummaryProvider>
            <DeadlinesSection />
            <TasksSection />
        </ScheduleSummaryProvider>
    );
}

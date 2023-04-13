import {
    useFetcher,
    useLoaderData,
    useRevalidator,
    useSearchParams,
} from "@remix-run/react";
import _ from "lodash";
import { DateTime as dt, Interval as int } from "luxon";
import { useEffect, useMemo, useState } from "react";
import {
    IAllocation,
    IRawAllocation,
    IRawTask,
    ITask,
    SummaryView,
} from "~/src";
import { getWorkDays } from "~/util/time";
import { ScheduleSummaryLoader } from "../route";

export const useTasks = () => {
    const rawTasks = useLoaderData<ScheduleSummaryLoader>();

    const [searchParams, setSearchParams] = useSearchParams();
    const { revalidate, state } = useRevalidator();

    const [tasks, setTasks] = useState<ITask[]>([]);

    const loadTasks = (view: SummaryView) => {
        setSearchParams({ view });
        revalidate();
    };

    useEffect(() => {
        function formatAllocation(allocation: IRawAllocation): IAllocation {
            const interval = int.fromDateTimes(
                dt.fromISO(allocation.start),
                dt.fromISO(allocation.end)
            );
            const workDays = getWorkDays(interval);
            const dailyWork =
                workDays > 0 ? _.round(allocation.work / workDays, 2) : 0;
            const display = {
                ...allocation.display,
                workDays: `${workDays} arbejdsdage`,
                dailyWork: `${dailyWork} timer`,
            };
            return {
                ...allocation,
                workDays,
                dailyWork,
                display,
                interval,
            };
        }

        function formatTask(task: IRawTask): ITask {
            const interval = int.fromDateTimes(
                dt.fromISO(task.start),
                dt.fromISO(task.end)
            );
            const workDays = getWorkDays(interval);
            const dailyWork =
                workDays > 0 ? _.round(task.work / workDays, 2) : 0;
            const display = {
                ...task.display,
                workDays: `${workDays} arbejdsdage`,
                dailyWork: `${workDays} timer`,
            };
            return {
                ...task,
                workDays,
                dailyWork,
                display,
                allocations: task.allocations.map(formatAllocation),
                interval,
            };
        }

        setTasks(
            _.sortBy(_.map(rawTasks, formatTask), (d) => d.interval.end?.toMillis())
        );
    }, [rawTasks]);

    const currentView = useMemo(() => {
        return searchParams.get("view") as SummaryView | undefined;
    }, [searchParams.get("view")]);

    useEffect(() => {
        if (currentView) loadTasks(searchParams.get("view") as SummaryView);
    }, [currentView]);

    return {
        tasks,
        loadingState: state,
        currentView,
    };
};

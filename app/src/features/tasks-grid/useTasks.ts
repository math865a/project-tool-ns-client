import { DateRange } from "@mui/x-date-pickers-pro";
import { useFetcher } from "@remix-run/react";
import _ from "lodash";
import { DateTime as dt, Interval as int } from "luxon";
import { useEffect, useState } from "react";
import { IAllocation, IRawAllocation, IRawTask, ITask } from "~/src";
import { getWorkDays } from "~/util/time";

export const useTasks = (resourceId: string) => {
    const fetcher = useFetcher<IRawTask[]>();

    const [period, setPeriod] = useState<{ start: dt; end: dt }>({
        start: dt.local().minus({ weeks: 2 }),
        end: dt.local().plus({ months: 3 }),
    });

    const updatePeriod = (range: DateRange<dt>) => {
        let start = period.start;
        let end = period.end;
        if (range[0]) {
            start = range[0];
        }
        if (range[1]) {
            end = range[1];
        }
        let newStart = dt.min(start, end);
        let newEnd = dt.max(start, end);
        setPeriod({
            start: newStart,
            end: newEnd,
        });
        loadTasks({ start: newStart, end: newEnd })
    };

    const [tasks, setTasks] = useState<ITask[]>([]);

    const loadTasks = (period: { start: dt; end: dt }) => {
        const searchParams = new URLSearchParams({
            start: period.start.toISODate() as string,
            end: period.end.toISODate() as string,
        })
        const url = `/api/tasks/${resourceId}?${searchParams.toString()}`;
        fetcher.load(url);
    };

    useEffect(() => {
        loadTasks(period);
    }, []);

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
        if (fetcher.data) {
            const newTasks = _.sortBy(
                _.map(fetcher.data, (d) => formatTask(d as IRawTask)),
                (d) => d.interval.start as dt
            );
            setTasks(newTasks);
        }
    }, [fetcher.data]);

    return {
        tasks,
        loadingState: fetcher.state,
        updatePeriod,
        period,
    };
};

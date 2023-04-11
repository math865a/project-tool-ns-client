import { useFetcher } from "@remix-run/react";
import _ from "lodash";
import { DateTime as dt, Interval as int } from "luxon";
import { useEffect, useState } from "react";
import { IEvent, IRawEvent } from "~/src";
import { getWorkDays } from "~/util/time";

export const useEvents = (resourceId: string) => {
    const rawEvents = useFetcher<IRawEvent[]>();

    const [events, setEvents] = useState<IEvent[]>([]);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const loadEvents = (startDate: dt, endDate: dt) => {
        const searchParams = new URLSearchParams({
            start: startDate.toISODate() as string,
            end: endDate.toISODate() as string,
        });
        rawEvents.load(`/api/events/${resourceId}?${searchParams.toString()}`);
    };

    useEffect(() => {
        const today = dt.local();

        loadEvents(
            dt
                .fromObject({ year: today.year, month: today.month, day: 1 })
                .minus({ weeks: 1 }),
            dt
                .fromObject({ year: today.year, month: today.month, day: 1 })
                .plus({ months: 1, weeks: 1 })
        );
    }, []);

    useEffect(() => {
        function formatEvent(event: IRawEvent): IEvent {
            const interval = int.fromDateTimes(
                dt.fromISO(event.start),
                dt.fromISO(event.end)
            );
            const workDays = getWorkDays(interval);
            const dailyWork =
                workDays > 0 ? _.round(event.work / workDays, 2) : 0;
            return {
                ...event,
                start: interval.start?.toJSDate() as Date,
                end: interval.end?.toJSDate() as Date,
                workDays,
                dailyWork,
                interval,
            };
        }

        if (rawEvents.state === "idle" && rawEvents.data) {
            setEvents(
                _.map(rawEvents.data, (d) => formatEvent(d as IRawEvent))
            );
            setHasLoaded(true);
        }
    }, [rawEvents.data, rawEvents.state]);

    return {
        events,
        loadEvents,
        hasLoaded,
    };
};

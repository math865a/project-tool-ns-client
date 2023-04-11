import { useMemo } from "react";
import { ITask, SummaryView } from "~/src";
import { DateTime as dt } from "luxon";
import _ from "lodash";

export interface IDeadlineTask extends ITask {
    due: number;
}

export const useDeadlines = (
    tasks: ITask[],
    currentView: SummaryView = SummaryView.Short
) => {
    const limit = useMemo(() => {
        switch (currentView) {
            case SummaryView.Long:
                return dt.local().plus({ weeks: 6 });
            default:
                return dt.local().plus({ days: 14 });
        }
    }, [currentView]);

    const deadlines = useMemo(() => {
        return _.sortBy(
            tasks.filter((task) => {
                return task.interval.end && task.interval.end < limit;
            }).map(d => ({
                ...d,
                due: d.interval.end ? _.round(d.interval.end.diff(dt.local(), "days").days) : 0
            })),
            (d) => d.interval.end?.toMillis()
        );
    }, [tasks, limit]);

    const title = useMemo(() => {
        switch (currentView) {
            case SummaryView.Long:
                return "Deadlines indenfor 6 uger";
            default:
                return "Deadlines de næste 14 dage";
        }
    }, [currentView]);

    return {
        title,
        deadlines,
    };
};

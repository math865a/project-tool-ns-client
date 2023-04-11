import { scaleLinear } from "@visx/scale";
import { DateTime as dt, Interval as int } from "luxon";
import { useMemo, useState } from "react";
import { useCapacityCharts } from "../../_state";

export const useTimeline = () => {

    const {dateRange: {dateRangeAsString: dateRange}} = useCapacityCharts()

    const [timelineWidth, setTimelineWidth] = useState<number>(500)

    const updateTimelineWidth = (width: number) => setTimelineWidth(width)

    const interval = useMemo(() => {
        const start = dt.fromISO(dateRange.startDate);
        const end = dt.fromISO(dateRange.endDate)
        return int.fromDateTimes(start, end)
    },[dateRange.startDate, dateRange.endDate])

    const scale = useMemo(() => {
        return scaleLinear({
            domain: [(interval.start as dt).toMillis(), (interval.end as dt).toMillis()],
            range: [0, timelineWidth]
        })
    },[timelineWidth, interval])

    return {
        scale,
        timelineWidth,
        updateTimelineWidth
    }

}
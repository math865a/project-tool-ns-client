import { useMemo } from "react";
import { useScale } from "../provider/TimelineProvider";
import { DateTime as dt } from "luxon";
import { IWorkpackageTask } from "../../_state/useWorkpackageTasks";

export const useTaskBar = (interval: IWorkpackageTask["interval"]) => {
    const { scale } = useScale();
    const x1 = useMemo(() => {
        return scale(dt.fromISO(interval.start).toMillis());
    }, [scale]);
    const x2 = useMemo(() => {
        return scale(dt.fromISO(interval.end).toMillis());
    }, [scale]);
    const w = useMemo(() => {
        return x2 - x1;
    }, [x2, x1]);

    return {
        x1,
        x2,
        w,
    };
};

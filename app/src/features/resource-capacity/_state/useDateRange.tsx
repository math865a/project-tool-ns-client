import { DateRange } from "@mui/x-date-pickers-pro";
import { DateTime as dt } from "luxon";
import { useMemo, useState } from "react";

export interface IDateRange {
    startDate: string;
    endDate: string;
}

export const useDateRange = () => {
    const [dateRange, setDateRange] = useState<[dt, dt]>([
        dt.now(),
        dt.now().plus({ weeks: 6 }),
    ]);

    const updateDateRange = (range: DateRange<dt>) => {
        let start = dateRange[0];
        let end = dateRange[1];
        if (range[0]){
            start = range[0]
        } 
        if (range[1]){
            end = range[1]
        }
        let newStart = dt.min(start, end);
        let newEnd = dt.max(start, end);
        setDateRange([newStart, newEnd]);
    };

    const dateRangeAsString = useMemo(() => {
        return {
            startDate: dateRange[0].toISODate() as string,
            endDate: dateRange[1].toISODate() as string
        }
    },[dateRange])

    

    const displayRange = useMemo(() => {
        return `${dateRange[0].toFormat("dd/MM/yy")} til ${dateRange[1].toFormat("dd/MM/yy")}`
    },[dateRange])

    return {
        dateRange,
        updateDateRange,
        dateRangeAsString,
        displayRange
    }
};

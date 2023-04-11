import { useMemo } from "react";
import { IDateRange, useDateRange } from "./useDateRange";
import { useBookingTypeData } from "./useBookingTypeData";
import { useCapacityDifferenceData } from "./useCapacityDifferenceData";
import { useWorkpackageChartsData } from "./useWorkpackageChartsData";
import { useActiveWorkpackage } from "./useActiveWorkpackage";
import { useWorkpackageTasks } from "./useWorkpackageTasks";

export interface IResourceCapacityParams extends IDateRange {
    resourceId: string;
}

export const useResourceCapacity = (resourceId: string) => {
    const dateRangeProps = useDateRange();

    const params = useMemo(() => {
        return {
            resourceId,
            ...dateRangeProps.dateRangeAsString,
        };
    }, [
        resourceId,
        dateRangeProps.dateRangeAsString.startDate,
        dateRangeProps.dateRangeAsString.endDate,
    ]);

    const bookingType = useBookingTypeData(params);
    const capacityDifference = useCapacityDifferenceData(params);
    const workpackage = useWorkpackageChartsData(params);
    const activeWorkpackage = useActiveWorkpackage(workpackage.totals);
    const workpackageTasks = useWorkpackageTasks(
        activeWorkpackage.activeWorkpackage,
        params
    );

    return {
        dateRange: dateRangeProps,
        bookingType,
        capacityDifference,
        workpackage,
        activeWorkpackage,
        workpackageTasks,
    };
};

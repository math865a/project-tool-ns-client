export class UpdatePeriodDto {

        public readonly activityId: string
        public readonly startDate: string
        public readonly endDate: string
        public readonly workDayCount: number


}

export class PeriodUpdatedResult {
    public readonly activityId: string;
    public readonly period: {
        startDate: string;
        endDate: string;
    }
    public readonly kind: "Plan" | "Delivery" | "Task" | "Assignment" | "Allocation"
}
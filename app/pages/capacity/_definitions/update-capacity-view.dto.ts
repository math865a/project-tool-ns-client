import { ViewMode } from "~/pages/capacity/_definitions/view-mode";

export class UpdateCapacityViewDto {
    public readonly viewId: string;
    public readonly resourcesToDelete: string[];
    public readonly bookingStagesToDelete: string[];
    public readonly resources: string[];
    public readonly bookingStages: string[];
    public readonly order: 1 | -1;
    public readonly showResourcesWithNoBookings: boolean;
    public readonly viewMode: ViewMode;
}

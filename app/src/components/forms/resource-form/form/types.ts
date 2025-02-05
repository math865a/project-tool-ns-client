import { ResourceTypeOption } from "~/src/_definitions/form";

export type IResourceValues = {
    id: string;
    name: string;
    color: string;
    initials: string;
    costDefault: number;
    costOvertime: number;
    calendar: string;
    resourceTypes: string[];
};

export type IResourceFormValues = Omit<IResourceValues, "resourceTypes"> & {
    resourceTypes: ResourceTypeOption[];
};

export interface IResourceFormOptons {
    calendars: any[];
    resourceTypes: ResourceTypeOption[];
}

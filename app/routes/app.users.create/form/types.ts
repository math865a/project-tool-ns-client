import { FormOption } from "@math865a/project-tool.types";
import { AccessGroupOption, ProjectManager, ResourceTypeOption } from "~/src";

export interface ICreateValues {
    uid: string;
    name: string;
    email: string;
    color: string;
    connect: string;
    accessGroups: string[];
    isProjectManager: boolean;
    isResource: boolean;
    resourceDto: ICreateValuesResourceDto;
    sendWelcomeMail: boolean;
}

export type ICreateValuesResourceDto = {
    initials: string;
    costDefault: number;
    costOvertime: number;
    calendar: string;
    resourceTypes: string[];
};

export type IFormValuesResourceDo = Omit<
    ICreateValuesResourceDto,
    "resourceTypes"
> & {
    resourceTypes: ResourceTypeOption[];
};

export interface IFormValues
    extends Omit<ICreateValues, "resourceDto" | "accessGroups"> {
    accessGroups: AccessGroupOption[];
    resourceDto: IFormValuesResourceDo;
}

export interface IUserConnectOption {
    id: string;
    name: string;
    color: string;
    isProjectManager: boolean;
    isResource: boolean;
}

export interface IOptions {
    calendars: FormOption[];
    resourceTypes: ResourceTypeOption[];
    accessGroups: AccessGroupOption[];
    connectOptions: IUserConnectOption[]
}


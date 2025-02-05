import { IconDef } from "~/src/design-system";
import { Subject } from "~/src/_definitions";
import {
    IconBriefcase,
    IconFile,
    IconLock,
    IconReceipt,
    IconUser,
    IconUserCog,
    IconUsers,
    IconUserScreen,
} from "@tabler/icons-react";

export interface ISidebarPage {
    url: string;
    icon: IconDef;
    space?: boolean;
    activeUrl?: string;
    isRoot?: boolean;
}

const prefix = "/app";

export function craftUrl(url: string): string {
    return `${prefix}/${url}`;
}

export const pageMap = {
    [Subject.Workpackages]: {
        text: Subject.Workpackages,
        to: craftUrl("workpackages"),
        activeUrl: craftUrl("workpackages"),
        icon: IconBriefcase,
    },
    [Subject.ProjectManagers]: {
        text: Subject.ProjectManagers,
        to: craftUrl("project-managers"),
        activeUrl: craftUrl("project-managers"),
        icon: IconUser,
        space: true,
    },
    [Subject.Capacity]: {
        text: Subject.Capacity,
        to: craftUrl("capacity"),
        activeUrl: craftUrl("capacity"),
        icon: IconUserScreen,
    },
    [Subject.Resources]: {
        text: Subject.Resources,
        to: craftUrl("resources"),
        activeUrl: craftUrl("resources"),
        icon: IconUsers,
        space: true,
    },

    [Subject.ResourceTypes]: {
        text: Subject.ResourceTypes,
        to: craftUrl("resourcetypes"),
        activeUrl: craftUrl("resourcetypes"),
        icon: IconUserScreen,
    },
    [Subject.Contracts]: {
        text: Subject.Contracts,
        to: craftUrl("contracts"),
        activeUrl: craftUrl("contracts"),
        icon: IconFile,
    },
    [Subject.FinancialSources]: {
        text: Subject.FinancialSources,
        to: craftUrl("financialsources"),
        activeUrl: craftUrl("financialsources"),
        icon: IconReceipt,
        space: true,
    },
    [Subject.Users]: {
        text: Subject.Users,
        to: craftUrl("users"),
        activeUrl: craftUrl("users"),
        icon: IconUserCog,
    },
    [Subject.AccessGroups]: {
        text: Subject.AccessGroups,
        to: craftUrl("access-groups"),
        activeUrl: craftUrl("access-groups"),
        icon: IconLock,
    },
};

export const administrationPage = {
    text: "Administration",
    to: "/app/administration/users",
    activeUrl: craftUrl("administration"),
    icon: IconLock,
};

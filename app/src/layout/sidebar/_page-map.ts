import {
    faBriefcase,
    faChartUser,
    faUsers,
    faScreenUsers,
    faFileContract,
    faReceipt,
    faLock,
    faUserGear,
    faUsersGear,
    faUserLock,
    faUserTie,
} from "@fortawesome/pro-light-svg-icons";
import { IconDef } from "~/src/design-system";
import { Subject } from "~/src/_definitions";

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
        icon: faBriefcase
    },
    [Subject.ProjectManagers]: {
        text: Subject.ProjectManagers,
        to: craftUrl("project-managers"),
        activeUrl: craftUrl("project-managers"),
        icon: faUserTie,
        space: true
    },
    [Subject.Capacity]: {
        text: Subject.Capacity,
        to: craftUrl("capacity"),
        activeUrl: craftUrl("capacity"),
        icon: faChartUser
    },
    [Subject.Resources]: {
        text: Subject.Resources,
        to: craftUrl("resources"),
        activeUrl: craftUrl("resources"),
        icon: faUsers,
        space: true
    },

    [Subject.ResourceTypes]: {
        text: Subject.ResourceTypes,
        to: craftUrl("resourcetypes"),
        activeUrl: craftUrl("resourcetypes"),
        icon: faScreenUsers
    },
    [Subject.Contracts]: {
        text: Subject.Contracts,
        to: craftUrl("contracts"),
        activeUrl: craftUrl("contracts"),
        icon: faFileContract,
    },
    [Subject.FinancialSources]: {
        text: Subject.FinancialSources,
        to: craftUrl("financialsources"),
        activeUrl: craftUrl("financialsources"),
        icon: faReceipt,
        space: true
    },
    [Subject.Users]: {
        text: Subject.Users,
        to: craftUrl("users"),
        activeUrl: craftUrl("users"),
        icon: faUsersGear,
    },
    [Subject.AccessGroups]: {
        text: Subject.AccessGroups,
        to: craftUrl("access-groups"),
        activeUrl: craftUrl("access-groups"),
        icon: faUserLock
    },
};

export const administrationPage =  {
    text: "Administration",
    to: "/app/administration/users",
    activeUrl: craftUrl("administration"),
    icon: faLock,
}
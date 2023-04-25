import {
    faBriefcase as lightBriefCase,
    faChartUser as lightChartUser,
    faUsers as lightUsers,
    faScreenUsers as lightScreenUsers,
    faFileContract as lightContract,
    faReceipt as lightReceipt,
    faUsersGear as lightUsersGear,
    faUserLock as lightUsersLock,
    faUserTie as lightUsersTie,
    faCalendarWeek as lightCalendarWeek,
} from "@fortawesome/pro-light-svg-icons";
import {
    faBriefcase as solidBriefCase,
    faChartUser as solidChartUser,
    faUsers as solidUsers,
    faScreenUsers as solidScreenUsers,
    faFileContract as solidContract,
    faReceipt as solidReceipt,
    faUsersGear as solidUsersGear,
    faUserLock as solidUsersLock,
    faUserTie as solidUsersTie,
    faCalendarWeek as solidCalendarWeek,
} from "@fortawesome/pro-solid-svg-icons";
import { IPageLink, IconDef } from "~/src/design-system";
import { Action, Subject } from "~/src/_definitions";

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

export const pages: IPageLink[] = [
    {
        title: Subject.Workpackages,
        to: craftUrl("workpackages"),
        icon: lightBriefCase,
        activeIcon: solidBriefCase,
        permission: {
            action: Action.Read,
            subject: Subject.Workpackages,
        },
    },
    {
        title: Subject.ProjectManagers,
        to: craftUrl("project-managers"),
        icon: lightUsersTie,
        activeIcon: solidUsersTie,
        permission: {
            action: Action.Read,
            subject: Subject.ProjectManagers,
        },
        space: true,
    },
    {
        title: Subject.Capacity,
        to: craftUrl("capacity"),
        icon: lightChartUser,
        activeIcon: solidChartUser,
        permission: {
            action: Action.Read,
            subject: Subject.Capacity,
        },
    },
    {
        title: Subject.Resources,
        to: craftUrl("resources"),
        icon: lightUsers,
        activeIcon: solidUsers,
        space: true,
        permission: {
            action: Action.Read,
            subject: Subject.Resources,
        },

    },
    {
        title: Subject.ResourceTypes,
        to: craftUrl("resourcetypes"),
        icon: lightScreenUsers,
        activeIcon: solidScreenUsers,
        permission: {
            action: Action.Read,
            subject: Subject.ResourceTypes,
        },
    },
    {
        title: Subject.Contracts,
        to: craftUrl("contracts"),
        icon: lightContract,
        activeIcon: solidContract,
        permission: {
            action: Action.Read,
            subject: Subject.Contracts,
        },
    },
    {
        title: Subject.FinancialSources,
        to: craftUrl("financialsources"),
        icon: lightReceipt,
        activeIcon: solidReceipt,
        space: true,
        permission: {
            action: Action.Read,
            subject: Subject.FinancialSources,
        },
    },
    {
        title: Subject.Users,
        to: craftUrl("users"),
        icon: lightUsersGear,
        activeIcon: solidUsersGear,
        permission: {
            action: Action.Read,
            subject: Subject.Users,
        },
    },
    {
        title: Subject.AccessGroups,
        to: craftUrl("access-groups"),
        icon: lightUsersLock,
        activeIcon: solidUsersLock,
        permission: {
            action: Action.Read,
            subject: Subject.AccessGroups,
        },
    },
];

export const schedulePage: IPageLink = {
    title: "Mit Skema",
    to: craftUrl("schedule"),
    icon: lightCalendarWeek,
    activeIcon: solidCalendarWeek,
    space: true,
};

export const allPages = [schedulePage, ...pages]


export function getPage(subject: Subject){
    return pages.find(p => p.title === subject) as IPageLink;
}

/*

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
}*/

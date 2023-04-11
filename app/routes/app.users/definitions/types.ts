import { AccessGroupOption } from "~/src";

export class UserAccessGroup {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly color: string;
    public readonly isDefault: boolean;
}

export class UserRow {
    public readonly uid: string;
    public readonly name: string;
    public readonly email: string;
    public readonly phone: string;
    public readonly color: string;
    public readonly isDeactivated: boolean;
    public readonly lastSeen: number | null;
    public readonly isOnline: boolean;
    public readonly isResource: boolean;
    public readonly isProjectManager: boolean;
    public readonly isSessionUser: boolean;
    public readonly accessGroups: string[];
}

export interface IUsersLoaderData {
    rows: UserRow[];
    accessGroupOptions: AccessGroupOption[];
}

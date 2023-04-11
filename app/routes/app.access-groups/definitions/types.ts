import { generateId } from "~/util";
import _ from "lodash";
import { defaultColors } from "~/src/design-system/controls/color-picker/defaultColors";
import { pageMap } from "~/src/layout/sidebar/_page-map";

export class Permissions {
    read: boolean;
    write: boolean;
    delete: boolean;
    constructor() {
        this.read = false;
        this.write = false;
        this.delete = false;
    }
}

export class AccessGroupRecord {
    id: string;
    name: string;
    description: string;
    color: string;
    isAdmin: boolean;
    users: string[]
    permissions: {
        [pageName: string]: Permissions;
    };
    constructor(name: string) {
        this.id =generateId(),
        this.name = name ?? "Ny adgangsgruppe";
        this.color = _.sample(defaultColors) as string;
        this.description = "";
        this.isAdmin = false;
        this.users = []
        this.permissions = _.fromPairs(
            _.map(_.keys(pageMap), (pageName) => [pageName, new Permissions()])
        );
    }
}

export class AccessGroupRow extends AccessGroupRecord {
    isNew: boolean;
    constructor(name: string, isNew: boolean) {
        super(name);
        this.isNew = isNew;
    }
}

export class UserOption {
    public readonly uid: string;
    public readonly name: string;
    public readonly color: string
}

export class PermissionsColumn {
    public readonly icon: string;
    public readonly name: string;
    public readonly url: string;
}

export class AccessGroupsViewData {
    public readonly data: AccessGroupRow[];
    public readonly permissionColumns: PermissionsColumn[];
    public readonly userOptions: UserOption[]
}

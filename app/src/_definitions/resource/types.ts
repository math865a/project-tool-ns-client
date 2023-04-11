export class ResourceProfile {
    public readonly node: ResourceRecord;
    public readonly resourcetypes: ResourceAgent[];
}

export class ResourceRecord {
    public readonly id: string;
    public readonly uid?: string;
    public readonly name: string;
    public readonly email?: string;
    public readonly initials: string;
    public readonly color: string;
    public readonly costDefault: number;
    public readonly costOvertime: number;
    public readonly isProjectManager: boolean;
    public readonly isUser: boolean;
}

export class ResourceAgent {
    public readonly id: string;
    public readonly name: string;
    public readonly typeNo: string;
    public readonly abbrevation: string;
    public readonly salesDefault: number;
    public readonly salesOvertime: number;
    public readonly agentId: string;
    public readonly contract: {
        id: string;
        name: string;
        abbrevation: string;
    };
}

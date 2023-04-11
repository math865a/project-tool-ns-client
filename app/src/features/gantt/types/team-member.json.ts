

export class ResourceJson {
    public readonly id: string;
    public readonly name: string;
    public readonly color: string;
    public readonly costRate: {
        default: number;
        overtime: number;
    }
}

export class ResourceTypeJson {
    public readonly id: string;
    public readonly name: string;
    public readonly typeNo: number;
    public readonly abbrevation: string;
    public readonly salesRate: {
        default: number;
        overtime: number;
    }
}


export class TeamMemberJson {
    public readonly id: string;
    public readonly resource: ResourceJson;
    public readonly resourceType: ResourceTypeJson;
}

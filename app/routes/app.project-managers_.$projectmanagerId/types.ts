import { ProjectManager, Stage } from "~/src/_definitions";

export interface IProjectManagerProfile {
    node: IProjectManagerNode;
    workpackages: ProjectManagerWorkpackage[];
}

export interface IProjectManagerNode {
    id: string;
    name: string;
    color: string;
    isResource: boolean;
    isUser: boolean;
}

export class ProjectManagerWorkpackage {
    public readonly id: string;
    public readonly financialSource: {
        id: string;
        name: string;
    };
    public readonly contract: {
        id: string;
        name: string;
    };
    public readonly serialNo: string;
    public readonly systematicName: string;
    public readonly name: string;
    public readonly stage: Stage;
    public readonly bookingStage: Stage;
    public readonly projectManager: ProjectManager;
    public readonly work: number;
    public readonly startDate: string;
    public readonly endDate: string;
    public readonly team: ProjectManager[];
}

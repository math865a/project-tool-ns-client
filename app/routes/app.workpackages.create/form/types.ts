import { FormOption } from "@math865a/project-tool.types";
import { ProjectManager, Stage } from "~/src";


export class CreateValues {
    public readonly name: string;
    public readonly description: string;
    public readonly contract: string;
    public readonly financialSource: string;
    public readonly serialNo: string;
    public readonly projectManager: string;
    public readonly startDate: string;
    public readonly endDate: string;
    public readonly stage: string;
}

export class CreateOptions {
    public readonly contractOptions: FormOption[];
    public readonly financialSourceOptions: FormOption[];
    public readonly projectManagerOptions: ProjectManager[];
    public readonly stageOptions: Stage[];
}

export class CreateForm {
    public readonly record: CreateValues;
    public readonly options: CreateOptions;
}
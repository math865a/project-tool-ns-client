import { GanttData } from "~/src/features/gantt/types";
import { ContractNode } from "../contract";
import { FinancialSourceNode } from "../financialsource";
import { ProjectManager } from "../project-manager";
import { WorkpackageNode } from "./workpackage-node";
import { Stage } from "../stage";

export class WorkpackageProfile {
    public readonly node: WorkpackageNode;
    public readonly foreignKeys: {
        financialSourceId: string;
        contractId: string;
        planId: string;
        bookingStageId: string;
        stageId: string;
    };
    public readonly options: {
        contracts: ContractNode[];
        financialSources: FinancialSourceNode[];
        stages: Stage[];
        bookingStages: Stage[];
    };
    public readonly managers: ManagerData;
    public readonly planning: GanttData;
}

export class ManagerData {
    public readonly projectManager: ProjectManager;
    public readonly propositionManager: ProjectManager;
}

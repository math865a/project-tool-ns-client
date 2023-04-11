import { ProjectManager } from "@math865a/project-tool.types";
import { IWorkpackageIdentity } from "../workpackage";
import { IAllocation, IRawAllocation } from "./allocation";
import { ITaskTeamMember } from "./task-teammember";
import {Interval as int} from "luxon"
import { Stage } from "../stage";
export interface IRawTask {
    id: string;
    color: string;
    title: string;
    start: string;
    end: string;
    allocatedPeriod: {
        start: string;
        end: string;
    }
    work: number;
    allocations: IRawAllocation[]
    team: ITaskTeamMember[]
    projectManager: ProjectManager;
    workpackage: IWorkpackageIdentity;
    bookingStage: Stage;
    stage: Stage
    display: IRawTaskDisplay
}

export interface IRawTaskDisplay {
    allocatedPeriod: {
        start: string;
        end: string;
    },
    period: {
        start: string;
        end: string;
    }
    work: string;
}

export interface ITaskDisplay extends IRawTaskDisplay {
    dailyWork: string;
    workDays: string;
}


export interface ITask extends Omit<IRawTask, "display" |"allocations"> {
    workDays: number;
    dailyWork: number;
    display: ITaskDisplay
    allocations: IAllocation[];
    interval: int; 
}
import { IWorkpackageIdentity } from "../workpackage";
import { Interval } from "luxon";
import { Stage } from "../stage";
import { ProjectManager } from "~/src";

export interface IRawEvent {
    id: string;
    taskId: string;
    color: string;
    title: string;
    start: string;
    allDay: boolean;
    end: string;
    work: number;
    projectManager: ProjectManager;
    workpackage: IWorkpackageIdentity;
    bookingStage: Stage;
    stage: Stage;
    display: {
        period: {
            start: string;
            end: string;
        };
        work: string;
    };
}

export interface IEvent extends Omit<IRawEvent, "start" | "end"> {
    start: Date;
    end: Date;
    workDays: number;
    dailyWork: number;
    interval: Interval;
}

import { makeAutoObservable } from "mobx";
import { Gantt } from "./gantt";
import { ActivityStore } from "./store.activities";
import { GanttTransport } from "./transport";
import { ActivityJson, AssignmentJson, TeamMemberJson } from "../types";
import { AssignmentStore } from "./store.assignments";
import { TeamStore } from "./store.team";

export class GanttStore {
    Gantt: Gantt;
    workpackageId: string;
    Transport: GanttTransport;
    ActivityStore: ActivityStore;
    AssignmentStore: AssignmentStore;
    TeamStore: TeamStore;
    constructor(
        Gantt: Gantt,
        workpackageId: string,
        data: {
            activities: ActivityJson[];
            assignments: AssignmentJson[];
            team: TeamMemberJson[];
        }
    ) {
        makeAutoObservable(this, {}, { autoBind: true })
        this.Gantt = Gantt;
        this.workpackageId = workpackageId;
        this.Transport = new GanttTransport(this);
        this.ActivityStore = new ActivityStore(
            this,
            this.Transport,
            data.activities
        );
        this.AssignmentStore = new AssignmentStore(
            this,
            this.Transport,
            data.assignments
        );
        this.TeamStore = new TeamStore(this, this.Transport, data.team);
    }
}

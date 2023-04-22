import { ActivityJson } from "./activity-json";
import { AssignmentJson } from "./assignment-json";
import { TeamMemberJson } from "./team-member.json";

export class GanttData {
    public readonly start: string;
    public readonly end: string;
    public readonly activities: ActivityJson[];
    public readonly assignments: AssignmentJson[];
    public readonly team: TeamMemberJson[];
}
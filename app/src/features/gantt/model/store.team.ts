import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { TeamMemberJson } from "../types";
import { GanttStore } from "./store";
import { TeamMember } from "./team/team-member.model";
import { GanttTransport } from "./transport";

export class TeamStore {
    GanttStore: GanttStore;
    Transport: GanttTransport;
    TeamMembers: TeamMember[] = [];
    constructor(
        GanttStore: GanttStore,
        Transport: GanttTransport,
        data: TeamMemberJson[]

    ) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.GanttStore = GanttStore;
        this.Transport = Transport;
        this.resolveMany(data);

    }

    getTeamMemberById(id: string) {
        return this.TeamMembers.find((a) => a.id === id);
    }

    resolveMany(json: TeamMemberJson[]) {
        json.forEach((teamMemberJson) => this.resolve(teamMemberJson));
    }

    resolve(json: TeamMemberJson) {
        let teamMember = this.TeamMembers.find(
            (teamMember) => teamMember.id === json.id
        );
        if (!teamMember) {
            teamMember = new TeamMember(this, json);
            this.TeamMembers.push(teamMember);
        } else {
            teamMember.update(json);
        }
        return teamMember;
    }

    addTeamMember = (json: TeamMemberJson) => {
        this.resolve(json);
        this.Transport.addTeamMember(json.id);
    };

    deleteTeamMember = (TeamMember: TeamMember) => {
        this.Transport.deleteTeamMember(TeamMember.id);
        TeamMember.Assignments.forEach((Assignment) => Assignment.remove());
        this.TeamMembers.splice(_.indexOf(this.TeamMembers, TeamMember), 1);
    };
}

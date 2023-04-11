import _ from "lodash";
import { action, computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { Rate, Resource, ResourceType, TeamMember } from "gantt-models";
import { TeamMemberJson } from "../../types";

@model("team-store")
export class TeamStore extends Model({
    TeamMembers: prop<TeamMember[]>(() => []),
}) {
    @computed
    get Transport() {
        return getRoot<Gantt>(this).Transport;
    }

    @modelAction
    resolveMany(data: TeamMemberJson[]) {
        data.forEach(action((json) => this.resolve(json)));
    }

    @modelAction
    resolve(json: TeamMemberJson) {
        let Model = _.find(this.TeamMembers, (d) => d.id === json.id);
        if (Model) {
            Model.update(json);
        } else {
            Model = this.createModel(json);
            this.TeamMembers.push(Model);
        }
    }

    @modelAction
    createModel(json: TeamMemberJson) {
        return new TeamMember({
            id: json.id,
            resource: new Resource({
                ...json.resource,
                costRate: new Rate(_.cloneDeep(json.resource.costRate)),
            }),
            resourceType: new ResourceType({
                ...json.resourceType,
                salesRate: new Rate(_.cloneDeep(json.resourceType.salesRate)),
            }),
        });
    }

    @modelAction
    addTeamMember = (json: TeamMemberJson) => {
        this.resolve(json);
        this.Transport.addTeamMember(json.id);
    };

    @modelAction
    deleteTeamMember(TeamMember: TeamMember) {
        this.Transport.deleteTeamMember(TeamMember.id);
        TeamMember.Assignments.forEach((Assignment) => Assignment.remove());
        this.TeamMembers.splice(_.indexOf(this.TeamMembers, TeamMember), 1);
    }

    @modelAction
    swapTeamMember(fromAgent: string, toAgent: string) {
        const from = _.find(this.TeamMembers, (d) => d.id === fromAgent) as
            | TeamMember
            | undefined;
        const to = _.find(this.TeamMembers, (d) => d.id === toAgent) as
            | TeamMember
            | undefined;
        if (from && to) {
            from.Assignments.forEach((Assignment) => {
                const Task = Assignment.Task;
                if (Task) {
                    const existingAssignment = to.Assignments.find(
                        (d) => d.Task === Task
                    );
                    if (existingAssignment) {
                        Assignment.Allocations.forEach((Allocation) => {
                            Assignment.removeAllocation(Allocation);
                            existingAssignment.addAllocation(Allocation);
                        });
                        Assignment.remove();
                    } else {
                        Assignment.setAgent(toAgent);
                    }
                }
            });
           //this.TeamMembers.splice(_.indexOf(this.TeamMembers, from), 1);
            this.Transport.swapTeamMember(fromAgent, toAgent);
            return true;
        }
        return false;
    }
}

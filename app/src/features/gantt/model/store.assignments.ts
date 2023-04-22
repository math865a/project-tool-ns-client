import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { EditValues } from "~/routes/app.workpackages_.$workpackageId.gantt.$allocationId/dialog/definitions/types";
import {
    CreateAllocationDto,
    CreateAssignmentDto,
    UpdateAllocationDto,
} from "~/src/_definitions";
import { generateId } from "~/util";
import { AllocationJson, AssignmentJson } from "../types";
import { Activity } from "./activity/activity.model";
import { Allocation } from "./allocation";
import { Assignment } from "./assignment/assignment.model";
import { GanttInterval } from "./shared";
import { GanttStore } from "./store";
import { TeamMember } from "./team/team-member.model";
import { GanttTransport } from "./transport";

export class AssignmentStore {
    GanttStore: GanttStore;
    Transport: GanttTransport;
    Assignments: Assignment[] = [];
    constructor(
        GanttStore: GanttStore,
        Transport: GanttTransport,
        data: AssignmentJson[]
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.GanttStore = GanttStore;
        this.Transport = Transport;
        this.resolveMany(data);
    }

    get Allocations() {
        return _.map(this.Assignments, (d) => d.Allocations).flat();
    }

    getAssignmentById(id: string) {
        return this.Assignments.find((a) => a.id === id);
    }

    resolveMany(json: AssignmentJson[]) {
        json.forEach((assignmentJson) => this.resolve(assignmentJson));
    }

    resolve(json: AssignmentJson) {
        let assignment = this.Assignments.find(
            (assignment) => assignment.id === json.id
        );
        if (!assignment) {
            assignment = new Assignment(this, json);
            this.Assignments.push(assignment);
        } else {
            assignment.update(json);
        }
        return assignment;
    }

    deleteAssignment(Assignment: Assignment) {
        this.Assignments.splice(this.Assignments.indexOf(Assignment), 1);
    }

    addAssignment(TeamMember: TeamMember, Task: Activity) {
        const json = new AssignmentJson({
            id: generateId(),
            agent: TeamMember.id,
            task: Task.id,
        });

        Task.addChild(json.id, Task.children.length);

        const dto: CreateAssignmentDto = {
            id: json.id,
            agentId: json.agent,
            taskId: json.task,
        };

        this.Transport.createAssignment(dto);

        const Assignment = this.resolve(json);
        this.addAllocation(Assignment, Task.Interval);
    }

    addAllocation(Assignment: Assignment, interval: GanttInterval) {
        const dto: CreateAllocationDto = {
            id: generateId(),
            taskId: Assignment.taskId,
            agentId: Assignment.agentId,
            startDate: interval.start,
            endDate: interval.end,
            defaultMinutes: 0,
            overtimeMinutes: 0,
        };
        this.Transport.createAllocation(dto);
        return Assignment.resolveAllocation(
            new AllocationJson({
                id: dto.id,
                interval: {
                    start: dto.startDate,
                    end: dto.endDate,
                },
                timesheet: {
                    defaultMinutes: dto.defaultMinutes,
                    overtimeMinutes: dto.overtimeMinutes,
                },
            })
        );
    }

    updateAllocation(Allocation: Allocation, values: EditValues) {
        Allocation.Interval.update(values.startDate, values.endDate);
        Allocation.Timesheet.updateTimesheet(
            values.defaultWork,
            values.overtimeWork
        );
        if (values.agentId !== Allocation.Assignment?.TeamMember?.id) {
            const Assignment = this.Assignments.find(
                (d) => d.TeamMember?.id === values.agentId
            );
            if (Assignment) {
                Allocation.Assignment?.removeAllocation(Allocation);
                Assignment.addAllocation(Allocation);
            }
        }

        const dto: UpdateAllocationDto = {
            allocationId: Allocation.id,
            agentId: values.agentId,
            defaultMinutes: Allocation.Timesheet.defaultMinutes,
            overtimeMinutes: Allocation.Timesheet.overtimeMinutes,
            startDate: values.startDate,
            endDate: values.endDate,
        };

        this.Transport.updateAllocation(dto);
    }

    deleteAllocation(Allocation: Allocation) {
        const Assignment = Allocation.Assignment;
        if (Assignment) {
            Assignment.removeAllocation(Allocation);
            this.Transport.removeAllocation(Allocation.id);
        }
        this.GanttStore.Gantt.Table.refreshRows();
    }

    removeAssignment(Assignment: Assignment) {
        this.Assignments.splice(_.indexOf(this.Assignments, Assignment), 1);
    }
}

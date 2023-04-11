import {
    Activity,
    Allocation,
    Assignment,
    Interval,
    TeamMember,
} from "gantt-models";
import _ from "lodash";
import { action, computed } from "mobx";
import {
    Model,
    getRoot,
    idProp,
    model,
    modelAction,
    prop,
} from "mobx-keystone";
import type { EditValues } from "../../../../../routes/app.workpackages_.$workpackageId.gantt.$allocationId/dialog/definitions/types";
import { Gantt } from "../../controllers/Gantt";
import { DateTime as dt, Interval as int } from "luxon";
import { CreateAllocationDto, CreateAssignmentDto } from "~/src/_definitions";
import { generateId, getDateObjectFromString } from "~/util";
import { AllocationJson, AssignmentJson } from "../../types";

@model("allotment-store")
export class AllotmentStore extends Model({
    id: idProp.typedAs<string>(),
    Assignments: prop<Assignment[]>(() => []),
}) {
    @computed
    get Transport() {
        return getRoot<Gantt>(this).Transport;
    }

    @computed
    get Table() {
        return getRoot<Gantt>(this).Table;
    }

    @computed
    get Allocations() {
        return this.Assignments.map((d) => d.Allocations).flat();
    }

    @modelAction
    resolveMany(data: AssignmentJson[]) {
        data.forEach(action((json) => this.resolve(json)));
    }

    @modelAction
    resolve(json: AssignmentJson) {
        let Model = _.find(this.Assignments, (d) => d.id === json.id);
        if (Model) {
            Model.update(json);
        } else {
            Model = this.createModel(json);
            this.Assignments.push(Model);
        }
        return Model;
    }

    @modelAction
    createModel(json: AssignmentJson) {
        return new Assignment({
            id: json.id,
            agent: json.agent,
            task: json.task,
            Allocations: _.map(json.allocations, (d) =>
                this.createAllocationModel(json.id, d)
            ),
        });
    }

    @modelAction
    createAllocationModel(assignmentId: string, json: AllocationJson) {
        return new Allocation({
            id: json.id,
            Interval: new Interval(json.interval),
            timesheet: json.timesheet,
            assignment: assignmentId,
        });
    }

    @modelAction
    deleteAssignment(Assignment: Assignment) {
        Assignment.Allocations.forEach((d) => Assignment.removeAllocation(d));
        Assignment.Task?.removeChild(Assignment.id);
        this.Assignments.splice(_.indexOf(this.Assignments, Assignment), 1);
        this.Transport.removeAssignment(Assignment.agent, Assignment.task);
        this.Table.api?.current.setRows(this.Table.Rows);
    }

    @modelAction
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
        this.addAllocation(Assignment, Task.Interval.interval);
    }

    @modelAction
    addAllocation(Assignment: Assignment, interval: int) {
        const dto: CreateAllocationDto = {
            id: generateId(),
            taskId: Assignment.task,
            agentId: Assignment.agent as string,
            startDate: (interval.start as dt).toFormat("yyyy-MM-dd"),
            endDate: (interval.end as dt).toFormat("yyyy-MM-dd"),
            defaultMinutes: 0,
            overtimeMinutes: 0,
        };
        this.Transport.createAllocation(dto);
        const Allocation = this.createAllocationModel(
            Assignment.id,
            new AllocationJson({
                id: dto.id,
                interval: {
                    start: getDateObjectFromString(dto.startDate),
                    end: getDateObjectFromString(dto.endDate),
                },
                timesheet: {
                    defaultMinutes: dto.defaultMinutes,
                    overtimeMinutes: dto.overtimeMinutes,
                },
            })
        );
        Assignment.addAllocation(Allocation);
        return Allocation;
    }

    @modelAction
    updateAllocation(Allocation: Allocation, values: EditValues) {
        Allocation.Interval.updatePeriod(
            int.fromDateTimes(
                dt.fromISO(values.startDate),
                dt.fromISO(values.endDate)
            )
        );
        Allocation.updateTimesheet(values.defaultWork, values.overtimeWork);
        if (values.agentId !== Allocation.Assignment?.TeamMember?.id) {
            const Assignment = this.Assignments.find(
                (d) => d.TeamMember?.id === values.agentId
            );
            if (Assignment) {
                Allocation.Assignment?.removeAllocation(Allocation);
                Assignment.addAllocation(Allocation);
            }
        }

        const dto = {
            allocationId: Allocation.id,
            agentId: values.agentId,
            ...Allocation.timesheet,
            startDate: values.startDate,
            endDate: values.endDate,
        };

        this.Transport.updateAllocation(dto);
    }
    @modelAction
    deleteAllocation(Allocation: Allocation) {
        const Assignment = Allocation.Assignment;
        if (Assignment) {
            Assignment.removeAllocation(Allocation);
            this.Transport.removeAllocation(Allocation.id);
        }
        this.Table.api?.current.setRows(this.Table.Rows);
    }

    @modelAction
    removeAssignment(Assignment: Assignment) {
        this.Assignments.splice(_.indexOf(this.Assignments, Assignment), 1);
    }
}

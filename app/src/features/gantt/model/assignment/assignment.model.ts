import { makeAutoObservable } from "mobx";
import { AllocationJson, AssignmentJson } from "../../types";
import { Allocation } from "../allocation/allocation.model";
import { AssignmentStore } from "../store.assignments";
import { AssignmentCanvas } from "./assignment.canvas";
import { AssignmentRow } from "./assignment.row";

export class Assignment {
    Store: AssignmentStore;
    id: string;
    agentId: string;
    taskId: string;
    Allocations: Allocation[] = [];
    Row: AssignmentRow;
    Canvas: AssignmentCanvas;
    kind: "Assignment" = "Assignment"

    constructor(Store: AssignmentStore, json: AssignmentJson) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Store = Store;
        this.update(json);
        this.Row = new AssignmentRow(this);
        this.Canvas = new AssignmentCanvas(this);
    }

    addAllocation(Allocation: Allocation) {
        this.Allocations.push(Allocation);
    }

    removeAllocation(Allocation: Allocation) {
        this.Allocations.splice(this.Allocations.indexOf(Allocation), 1);
    }

    onDragEnd = () => {
        this.Allocations.forEach((allocation) => allocation.Bar.save());
    };

    resolveAllocation(json: AllocationJson) {
        let allocation = this.Allocations.find(
            (allocation) => allocation.id === json.id
        );
        if (!allocation) {
            allocation = new Allocation(this, json);
            this.Allocations.push(allocation);
        } else {
            allocation.update(json);
        }
        return allocation;
    }

    update(json: AssignmentJson) {
        this.id = json.id;
        this.agentId = json.agent;
        this.taskId = json.task;
        json.allocations.forEach((allocationJson) =>
            this.resolveAllocation(allocationJson)
        );
    }

    get Task() {
        return this.Store.GanttStore.ActivityStore.getActvitityById(
            this.taskId
        );
    }

    get TeamMember() {
        return this.Store.GanttStore.TeamStore.getTeamMemberById(this.agentId);
    }

    remove(){
        this.Store.removeAssignment(this)
    }
}

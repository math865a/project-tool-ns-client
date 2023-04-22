import { makeAutoObservable } from "mobx";
import { Assignment } from "./assignment.model";

export class AssignmentRow {
    Assignment: Assignment;
    constructor(Assignment: Assignment) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Assignment = Assignment;
    }

    get path() {
        if (!this.Assignment.Task || !this.Assignment.Task.Parent)
            return [this.Assignment.taskId, this.Assignment.id];
        return [
            this.Assignment.Task.Parent.id,
            this.Assignment.taskId,
            this.Assignment.id,
        ];
    }
}

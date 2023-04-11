import { AllocationJson } from "./allocation-json";


export class AssignmentJson {
    id: string;
    agent: string;
    task: string;
    allocations: AllocationJson[];
    constructor(props: {
        id: string;
        agent: string;
        task: string;
        allocations?: AllocationJson[];
    }) {
        this.id = props.id;
        this.agent = props.agent;
        this.task = props.task;
        this.allocations = props.allocations ?? [];
    }
}

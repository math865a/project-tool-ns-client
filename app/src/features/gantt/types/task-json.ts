import { DateObjectUnits } from "luxon";

export class TaskJson {
    kind: 'Task' = 'Task';
    id: string;
    name: string = "Ny opgave";
    description: string = "";
    children: string[] = [];
    startDate: string;
    endDate: string;
    constructor(props: {
        id: string;
        startDate: string;
        endDate: string;
    }) {
        this.id = props.id;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
    }
}
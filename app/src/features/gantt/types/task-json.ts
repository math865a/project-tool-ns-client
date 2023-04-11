import { DateObjectUnits } from "luxon";

export class TaskJson {
    kind: 'Task' = 'Task';
    id: string;
    name: string = "Ny opgave";
    description: string = "";
    children: string[] = [];
    startDate: DateObjectUnits;
    endDate: DateObjectUnits;
    constructor(props: {
        id: string;
        startDate: DateObjectUnits;
        endDate: DateObjectUnits;
    }) {
        this.id = props.id;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
    }
}
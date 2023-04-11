import { DateObjectUnits } from "luxon";

export class PlanJson {
    kind: 'Plan' = 'Plan';
    id: string;
    startDate: DateObjectUnits;
    endDate: DateObjectUnits;
    children: string[];
    name: string = 'Plan';
    description?: string;
    constructor(props: {
        id: string,
        startDate: DateObjectUnits;
        endDate: DateObjectUnits;
        children?: string[];
    }) {
        Object.assign(this, props)
        this.children = props.children ? props.children : []
    }
}
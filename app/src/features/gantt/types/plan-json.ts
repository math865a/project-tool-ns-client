

export class PlanJson {
    kind: 'Plan' = 'Plan';
    id: string;
    startDate: string;
    endDate: string;
    children: string[];
    name: string = 'Plan';
    description?: string;
    constructor(props: {
        id: string,
        startDate: string;
        endDate: string;
        children?: string[];
    }) {
        Object.assign(this, props)
        this.children = props.children ? props.children : []
    }
}
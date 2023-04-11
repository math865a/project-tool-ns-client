import { DateObjectUnits } from "luxon";

export class DeliveryJson {
    kind: 'Delivery' = 'Delivery';
    id: string;
    name: string = "Ny leverance";
    description: string = ""
    children: string[] = []
    startDate: DateObjectUnits;
    endDate: DateObjectUnits;
    color: string;
    constructor(props: {
        id: string;
        startDate: DateObjectUnits;
        endDate: DateObjectUnits;
        color: string;
    }) {
        this.id = props.id;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.color = props.color;
    }
}
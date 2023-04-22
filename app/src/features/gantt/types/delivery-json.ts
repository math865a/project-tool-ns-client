
export class DeliveryJson {
    kind: 'Delivery' = 'Delivery';
    id: string;
    name: string = "Ny leverance";
    description: string = ""
    children: string[] = []
    startDate: string;
    endDate: string;
    color: string;
    constructor(props: {
        id: string;
        startDate: string;
        endDate: string;
        color: string;
    }) {
        this.id = props.id;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.color = props.color;
    }
}
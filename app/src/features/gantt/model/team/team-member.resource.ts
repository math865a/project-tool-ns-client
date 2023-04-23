import { makeAutoObservable } from "mobx";
import { ResourceJson } from "../../types";
import { Rate } from "../shared";

export class Resource {
    id: string;
    name: string;
    color: string;
    CostRate: Rate;
    constructor(props: ResourceJson) {
        makeAutoObservable(this, {}, { autoBind: true })
        this.update(props);
    }

    update(props: ResourceJson) {
        this.id = props.id;
        this.name = props.name;
        this.color = props.color;
        this.CostRate = new Rate(props.costRate);
    }
}

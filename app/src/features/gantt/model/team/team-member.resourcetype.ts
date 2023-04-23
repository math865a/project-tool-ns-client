import { makeAutoObservable } from "mobx";
import { ResourceTypeJson } from "../../types";
import { Rate } from "../shared";

export class ResourceType {
    id: string;
    name: string;
    typeNo: number;
    abbrevation: string
    SalesRate: Rate;
    constructor(props: ResourceTypeJson) {
        makeAutoObservable(this, {}, { autoBind: true })
        this.update(props);
    }

    update(props: ResourceTypeJson) {
        this.id = props.id;
        this.name = props.name;
        this.typeNo = props.typeNo;
        this.abbrevation = props.abbrevation;
        this.SalesRate = new Rate(props.salesRate);
    }
}

import { makeAutoObservable } from "mobx";

export class Rate {
    default: number;
    overtime: number;
    constructor(props: { default: number; overtime: number }) {
        makeAutoObservable(this, {}, { autoBind: true })
        this.default = props.default;
        this.overtime = props.overtime;
    }
}

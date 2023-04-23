import { makeAutoObservable } from "mobx";

export class MenuPosition {
    constructor(public x: number, public y: number) {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get anchorPosition() {
        return {
            left: this.x + 2,
            top: this.y - 6,
        };
    }
}

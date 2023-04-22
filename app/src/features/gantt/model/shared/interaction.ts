import { makeAutoObservable } from "mobx";

export class GanttInteraction {
    isHoveringBar: boolean = false;
    isHovering: boolean = false;
    isSelected: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateBarHovering(isHovering: boolean) {
        this.isHoveringBar = isHovering;
    }

    updateHovering(isHovering: boolean) {
        this.isHovering = isHovering;
    }

    updateSelected(isSelected: boolean) {
        this.isSelected = isSelected;
    }
}

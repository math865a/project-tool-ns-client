import { makeAutoObservable } from "mobx";
import { Gantt } from "./gantt";

export class GanttDimensions {
    Gantt: Gantt;
    width: number = 1200;
    height: number = 800;
    timelineWidth: number = 300;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    set updateTimelineWidth(width: number) {
        this.timelineWidth = width;
    }

    update(width: number, height: number) {
        this.width = width;
        this.height = height;
    }



}

import { computed } from "mobx";
import { getRoot, Model, model, modelAction } from "mobx-keystone";
import { Gantt } from "../Gantt";

@model("table-hover")
export class TableHover extends Model({}) {
    @computed
    get Activities() {
        return getRoot<Gantt>(this).ActivityStore.Activities;
    }

    findActivity(event: React.MouseEvent) {
        const selectedRow = event.currentTarget.getAttribute("data-id");
        const Activity = this.Activities.find((d) => d.id === selectedRow);
        return Activity;
    }

    @modelAction
    onMouseLeave = (event: React.MouseEvent) => {
        this.findActivity(event)?.setIsHovering(false);
    };

    @modelAction
    onMouseEnter = (event: React.MouseEvent) => {
        this.findActivity(event)?.setIsHovering(true);
    };

    @computed
    get listeners() {
        return {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
        };
    }

}

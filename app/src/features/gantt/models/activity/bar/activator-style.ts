import { computed } from "mobx";
import { getParent, getRoot, Model, model } from "mobx-keystone";
import { type CSSProperties } from "react";
import { Gantt } from "gantt/controllers/Gantt";
import { HANDLE_WIDTH } from "gantt/constants";
import { Bar } from "../activity.bar";

@model("bar-style")
export class ActivatorStyles extends Model({}) {
    @computed
    get Bar() {
        return getParent<Bar>(this) as Bar;
    }

    @computed
    get Activity() {
        return this.Bar.Activity;
    }
    @computed
    get TimelineEvent(){
        return getRoot<Gantt>(this).Timeline.TimelineEvent
    }

    @computed
    get handleWidth() {
        return this.Activity.kind === "Task" ? HANDLE_WIDTH : 0;
    }

    @computed
    get dragActivatorCursor() {
        if (!this.TimelineEvent.Bar && this.Activity.isHovering){
            return "grab"
        }

        
        switch (this.Bar.event) {
            case "move":
                return "grabbing";
            case "resize-start":
                return "w-resize";
            case "resize-end":
                return "w-resize";
            default:
                return "default";
        }
    }

    @computed
    get defaultActivatorStyles(): CSSProperties {
        return {
            backgroundColor: "transparent",
            position: "absolute",
            height: this.Bar.h,
        };
    }

    @computed
    get moveActivatorStyles(): CSSProperties {
        return {
            ...this.defaultActivatorStyles,
            cursor: this.dragActivatorCursor,
            left: this.handleWidth,
            right: this.handleWidth,
            zIndex: 400,
        };
    }

    @computed
    get defaultResizeActivatorStyles(): CSSProperties {
        return {
            ...this.defaultActivatorStyles,
            width: Math.min(this.handleWidth, this.Bar.coord.w / 3),
            zIndex: 401,
            cursor: "w-resize",
        };
    }

    @computed
    get resizeStartActivatorStyles(): CSSProperties {
        return {
            ...this.defaultResizeActivatorStyles,
            left: 0,
        };
    }

    @computed
    get resizeEndActivatorStyles(): CSSProperties {
        return {
            ...this.defaultResizeActivatorStyles,
            right: 0,
        };
    }
}

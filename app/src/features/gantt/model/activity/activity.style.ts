import { makeAutoObservable } from "mobx";
import { Activity } from "./activity.model";
import { CSSProperties } from "react";
import { HANDLE_WIDTH } from "../../constants";

export class ActivityStyle {
    Activity: Activity;
    constructor(Activity: Activity) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Activity = Activity;
    }

    get fill() {
        if (this.Activity.kind === "Delivery") return this.Activity.color as string;
        else if (this.Activity.kind === "Task" && this.Activity.Parent)
            return this.Activity.Parent.color as string;
        return "#000";
    }

    get fontWeight() {
        if (this.Activity.kind === "Delivery") return 600;
        return 100;
    }

    get textColor() {
        if (this.Activity.kind === "Delivery") return "text.primary";
        return "text.secondary";
    }

    get handleWidth() {
        return this.Activity.kind === "Task" ? HANDLE_WIDTH : 0;
    }

    get dragActivatorCursor() {
        if (
            !this.Activity.Bar.Timeline.Drag.isDragging &&
            this.Activity.Interaction.isHoveringBar
        ) {
            return "grab";
        }

        switch (this.Activity.Bar.Delta.event) {
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

    get defaultActivatorStyles(): CSSProperties {
        return {
            backgroundColor: "transparent",
            position: "absolute",
            height: this.Activity.Bar.rect.h,
        };
    }

    get moveActivatorStyles(): CSSProperties {
        return {
            ...this.defaultActivatorStyles,
            cursor: this.dragActivatorCursor,
            left: this.handleWidth,
            right: this.handleWidth,
            zIndex: 400,
        };
    }

    get defaultResizeActivatorStyles(): CSSProperties {
        return {
            ...this.defaultActivatorStyles,
            width: Math.min(this.handleWidth, this.Activity.Bar.rect.w / 3),
            zIndex: 401,
            cursor: "w-resize",
        };
    }

    get resizeStartActivatorStyles(): CSSProperties {
        return {
            ...this.defaultResizeActivatorStyles,
            left: 0,
        };
    }

    get resizeEndActivatorStyles(): CSSProperties {
        return {
            ...this.defaultResizeActivatorStyles,
            right: 0,
        };
    }
}

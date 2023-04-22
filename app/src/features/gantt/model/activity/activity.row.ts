import { makeAutoObservable } from "mobx";
import { Activity } from "./activity.model";


export class ActivityRow {
    Activity: Activity;
    isExpanded: boolean = false;
    constructor(Activity: Activity) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Activity = Activity;
    }

    set updateExpanded(isExpanded: boolean){
        this.isExpanded = isExpanded;
    }

    get path() {
        if (this.Activity.kind === "Delivery") {
            return [this.Activity.id];
        } else if (this.Activity.kind === "Task" && this.Activity.Parent) {
            return [this.Activity.Parent.id, this.Activity.id];
        }
        return [this.Activity.id];
    }


    get sequence(){
        return this.Activity.Parent?.children.indexOf(this.Activity.id) ?? 0;
    }

    get wbs(): string | number {
        if (this.Activity.kind === "Delivery") {
            return this.sequence + 1;
        } else if (this.Activity.Parent) {
            return this.Activity.Parent?.Row.wbs + "." + (this.sequence + 1);
        }
        return "";
    }




}

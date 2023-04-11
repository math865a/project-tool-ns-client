import { computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { Gantt } from "../Gantt";


@model("table-selection")
export class TableSelection extends Model({
    selectedActivity: prop<string | null>(null).withSetter()
}){

    @modelAction
    selectRow = (id: string) => {
        this.setSelectedActivity(id)
    }

    @modelAction
    deselectRow = () => {
        this.setSelectedActivity(null)
    }

    @computed
    get ActivityStore(){
        return getRoot<Gantt>(this).ActivityStore
    }

    @computed
    get SelectedActivity(){
        return this.ActivityStore.Activities.find(d => d.id === this.selectedActivity)
    }

}
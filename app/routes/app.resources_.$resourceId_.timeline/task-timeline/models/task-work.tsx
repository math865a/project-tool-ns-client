import { formatDecimal } from "~/util";
import { computed } from "mobx";
import { Model, model, prop } from "mobx-keystone";


@model("timeline-task-work")
export class TimelineTaskWork extends Model({
    work: prop<number>(),
    workdayCount: prop<number>(),
    dailyWork: prop<number>()
}, {
    valueType: true
}){

    @computed
    get workDisplay(){
        return `${formatDecimal(this.work)}t | ${formatDecimal(this.dailyWork)}t/dag`
    }



}
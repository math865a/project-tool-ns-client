import { getDateTime, getInterval } from "~/util";
import { computed } from "mobx";
import { Model, model, prop } from "mobx-keystone";
import {Interval as int} from "luxon"

@model("timeline-task-period")
export class TimelineTaskPeriod extends Model({
    startDate: prop<string>(),
    endDate: prop<string>()
}, {
    valueType: true
}){

    @computed
    get dtStart(){
        return getDateTime(this.startDate)
    }

    @computed
    get dtEnd(){
        return getDateTime(this.endDate)
    }

    @computed
    get interval(){
        return int.fromDateTimes(this.dtStart, this.dtEnd)
    }



}   
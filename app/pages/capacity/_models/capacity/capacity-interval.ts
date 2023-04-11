import { normalize } from '~/util';
import { Interval as int } from "luxon";
import { computed } from 'mobx';
import { getRoot, Model, model, prop } from 'mobx-keystone';
import { CapacityBoard } from '../../_controllers/_board';

@model('capacity-interval')
export class CapacityInterval extends Model({
    ts: prop<number>(),
    tf: prop<number>(),
}) {

    @computed
    get tId(){
        return this.startDate.toFormat("yyyy-MM-dd")
    }

    @computed
    get Dimensions() {
        return getRoot<CapacityBoard>(this).Dimensions;
    }

    @computed
    get startDate(){
        return normalize(this.ts)
    }


    @computed
    get endDate(){
        return normalize(this.tf).plus({days: 1})
    }

    @computed
    get interval(){
        return int.fromDateTimes(this.startDate, this.endDate)
    }

    @computed
    get x1() {
        return this.Dimensions.xScale(this.startDate.toMillis());
    }

    @computed
    get x2() {
        return this.Dimensions.xScale(this.endDate.toMillis());
    }

    @computed
    get w() {
        return this.x2 - this.x1;
    }
}

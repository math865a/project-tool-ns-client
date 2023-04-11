import _ from 'lodash';
import { computed } from 'mobx';
import { getRoot, Model, model, prop } from 'mobx-keystone';
import { CapacityBoard } from '../../_controllers/_board';

@model('capacity-stats')
export class CapacityStats extends Model({
    softBookedDuration: prop<number>(),
    hardBookedDuration: prop<number>(),
    capacityDuration: prop<number>(),
}) {

    @computed
    get BookingStageFilter(){
        return getRoot<CapacityBoard>(this).Filter.BookingStageFilter
    }

    @computed
    get bookedDuration(){
        let dur: number = 0;
        if (this.BookingStageFilter.filterState.includes("Soft")){
            dur += this.softBookedDuration
        }
        if (this.BookingStageFilter.filterState.includes("Hard")){
            dur += this.hardBookedDuration
        }
        return _.round(dur,1)
    }

    @computed
    get ratio() {
        if (this.capacityDuration === 0) return 0;
        return _.round(this.bookedDuration / this.capacityDuration, 2);
    }

    @computed
    get percent() {
        return _.round(this.ratio * 100, 1);
    }
}

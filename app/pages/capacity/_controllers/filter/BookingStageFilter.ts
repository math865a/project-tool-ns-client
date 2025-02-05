import _ from "lodash";
import { computed } from "mobx";
import { Model, model, modelAction, prop } from "mobx-keystone";
import { BookingStageNode } from "~/pages/capacity/_definitions";

@model("booking-stage-filter")
export class BookingStageFilter extends Model({
    filterState: prop<string[]>().withSetter(),
    bookingStages: prop<BookingStageNode[]>(),
}) {
    @computed
    get bookingStageOptions() {
        return _.sortBy(this.bookingStages, (d) => d.sequence);
    }

    @modelAction
    toggleStage = (bookingStage: string) => {
        if (
            this.filterState.includes(bookingStage) &&
            this.filterState.length > 1
        ) {
            this.filterState.splice(
                _.indexOf(this.filterState, bookingStage),
                1
            );
        } else {
            this.filterState.push(bookingStage);
        }
    };

    @modelAction
    clearFilter = () => {
        this.setFilterState(this.bookingStages.map((d) => d.name));
    };
}

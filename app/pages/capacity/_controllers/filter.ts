import { computed } from "mobx";
import { getRoot, Model, model, prop } from "mobx-keystone";
import { CapacityBoard } from "./_board";
import { BookingStageFilter } from "./filter/BookingStageFilter";
import { RowFilter } from "./filter/RowFilter";



@model("capacity-filter")
export class Filter extends Model({
    RowFilter: prop<RowFilter>(() => new RowFilter({})),
    BookingStageFilter: prop<BookingStageFilter>()
    
}){

    @computed
    get Root(){
        return getRoot<CapacityBoard>(this)
    }

    @computed
    get filter(){
        return {
            rowMode: this.Root.View.rowMode,
            viewMode: this.Root.View.viewMode,
            bookingStages: this.BookingStageFilter.filterState,
            
        }
    }
}
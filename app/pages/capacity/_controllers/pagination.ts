import _ from "lodash";
import { comparer, computed, reaction } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { FOOTER_HEIGHT, HEADER_HEIGHT, ROW_HEIGHT } from "../_config/contants";
import { CapacityBoard } from "./_board";
import {DateTime as dt} from "luxon"
@model("capacity-pagination")
export class Pagination extends Model({
    page: prop<number>(0).withSetter(),
}) {
    onAttachedToRootStore() {
        const autoPageSize = reaction(() => this.pageSize, (pageSize) => {
            getRoot<CapacityBoard>(this).api?.current.setPageSize(pageSize)
        }, {equals: comparer.shallow})

        return () => {
         //   sync();
            autoPageSize()
        };
    }

    updatePage(page: number){
        this.setPage(page);
        const rows = _.slice(
            this.Rows,
            this.rowRange.first,
            this.rowRange.last
        ).map((d) => d.id);
        const boundaries = getRoot<CapacityBoard>(
            this
        ).Boundary.dataBoundaries.map((d) => ({
            ts: (d.interval.start as dt).toFormat("yyyy-MM-dd"),
            tf: (d.interval.end as dt).toFormat("yyyy-MM-dd"),
        }));
        getRoot<CapacityBoard>(this).CapacityStore.loadBatch(
            rows,
            boundaries
        );
    }

    @computed
    get pageSize(){
        return Math.floor(((this.Dimensions.windowDimensions.height*0.78)-HEADER_HEIGHT-FOOTER_HEIGHT)/ROW_HEIGHT)
    }

    @computed
    get Dimensions(){
        return getRoot<CapacityBoard>(this).Dimensions
    }

    @computed
    get RowStore() {
        return getRoot<CapacityBoard>(this).RowStore;
    }

    @computed
    get RowFilter() {
        return getRoot<CapacityBoard>(this).Filter.RowFilter;
    }

    @computed
    get Rows() {
        return this.RowFilter.eligibleRows;
    }

    @computed
    get rows() {
        return this.Rows.map((d) => d.id);
    }

    @computed
    get rowCount() {
        return this.Rows.length;
    }

    @computed
    get pageCount() {
        return _.ceil(this.rowCount / this.pageSize);
    }

    @computed
    get rowRange() {
        if (this.pageSize === -1)
            return {
                first: 0,
                last: this.rowCount,
            };
        const first = this.pageSize * this.page;
        return {
            first: first,
            last: first + this.pageSize,
        };
    }

    @computed
    get visibleRows() {
        return _.slice(this.Rows, this.rowRange.first, this.rowRange.last);
    }
}

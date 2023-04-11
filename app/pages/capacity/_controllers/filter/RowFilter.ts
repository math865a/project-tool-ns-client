import _ from 'lodash';
import { computed } from 'mobx';
import { getRoot, Model, model, modelAction, prop } from 'mobx-keystone';
import { ResourceRow } from '../../_models/row/resource-row.model';
import { CapacityBoard } from '../_board';
import {DateTime as dt} from "luxon"
@model('row-filter')
export class RowFilter extends Model({
    rowFilter: prop<string[]>(() => []).withSetter(),
    showRowsWithoutBookings: prop<boolean>(false).withSetter(),
}) {

    @computed
    get RowStore() {
        return getRoot<CapacityBoard>(this).RowStore;
    }

    @computed
    get CapacityStore() {
        return getRoot<CapacityBoard>(this).CapacityStore;
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get Pagination(){
        return getRoot<CapacityBoard>(this).Pagination
    }

    @computed
    get Boundary(){
        return getRoot<CapacityBoard>(this).Boundary
    }

    @modelAction
    updateRowFilter = (row: ResourceRow) => {
        if (this.rowFilter.includes(row.id)) {
            this.rowFilter.splice(_.indexOf(this.rowFilter, row.id), 1);
            if (this.rowFilter.length === 0) {
                this.Pagination.setPage(0)
            }
        } else {
            if (this.rowFilter.length === 0){
                this.Pagination.setPage(0)
            }
            this.rowFilter.push(row.id);
            const boundaries = this.Boundary.dataBoundaries.map((d) => ({
                ts: (d.interval.start as dt).toFormat("yyyy-MM-dd"),
                tf: (d.interval.end as dt).toFormat("yyyy-MM-dd"),
            }));
            this.CapacityStore.loadBatch([row.id], boundaries);
        }
    };

    @modelAction
    clearFilter = () => {
        this.setRowFilter([]);
        this.Pagination.updatePage(0)
    };

    @modelAction
    updateShowRowsWithoutBookings = (value: boolean) => {
        this.setShowRowsWithoutBookings(value);
        if (!value && this.filterCount > 0) {
            const rowsWithoutBookingsIds = _.map(
                this.rowsWithBookings,
                (d) => d.id
            );
            this.rowFilter = this.rowFilter.filter(
                (d) => !rowsWithoutBookingsIds.includes(d)
            );
        }
    };

    @computed
    get rowsWithBookings() {
        return _.filter(this.RowStore.Resources, (d) => d.hasBookings);
    }

    @computed
    get rowsWithoutBookings() {
        return _.filter(this.RowStore.Resources, (d) => !d.hasBookings);
    }

    @computed
    get sortedRows() {
        if (this.showRowsWithoutBookings) {
            return _.sortBy(this.RowStore.Resources, (d) => d.name);
        }
        return _.sortBy(this.rowsWithBookings, (d) => d.name);
    }

    @computed
    get options() {
        return this.sortedRows;
    }

    @computed
    get filterState() {
        return _.filter(this.sortedRows, (d) => this.rowFilter.includes(d.id));
    }

    @computed
    get eligibleRows() {
        if (this.filterCount === 0) return this.sortedRows;
        return this.filterState;
    }

    @computed
    get filterCount() {
        return this.rowFilter.length;
    }
}

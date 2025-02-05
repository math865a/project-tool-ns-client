import { computed, when } from "mobx";
import {
    getRoot,
    idProp,
    Model,
    model,
    modelAction,
    prop,
} from "mobx-keystone";
import { CapacityBoard } from "../../_controllers/_board";
import { CapacityInterval } from "./capacity-interval";
import { CapacityStats } from "./capacity-stats";
import { CapacityStyle } from "./capacity-style";
import { RowMode, ViewMode } from "~/pages/capacity/_definitions";

@model("capacity-model")
export class Capacity extends Model({
    id: idProp.typedAs<string>(),
    viewMode: prop<ViewMode>(),
    rowMode: prop<RowMode>(),
    rowId: prop<string>(),
    Interval: prop<CapacityInterval>(),
    Stats: prop<CapacityStats>(),
    Style: prop<CapacityStyle>(),
}) {
    @computed
    get Store() {
        return getRoot<CapacityBoard>(this).CapacityStore;
    }

    @computed
    get Column() {
        return this.View.Columns.find((d) => d.ts === this.Interval.tId);
    }

    @computed
    get Boundary() {
        return getRoot<CapacityBoard>(this).Boundary;
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get Pagination() {
        return getRoot<CapacityBoard>(this).Pagination;
    }

    @computed
    get Calendar() {
        return getRoot<CapacityBoard>(this).Calendar;
    }

    @computed
    get hasViewModeChanged() {
        return this.View.viewMode !== this.viewMode;
    }

    @computed
    get isNotVisible() {
        return !this.Pagination.visibleRows.some((d) => d.id === this.rowId);
    }

    onAttachedToRootStore() {
        /* const removeListener = reaction(
             () => this.shouldDelete,
             (shouldDelete) => {
                 if (shouldDelete) {
                     this.remove()
                 }
             },
             { equals: comparer.shallow }
         );*/

        const dispose = when(
            () =>
                this.Column === undefined ||
                this.hasViewModeChanged === true ||
                this.isNotVisible,
            () => this.remove()
        );

        return () => {
            dispose();
        };
        /*return () => {
            removeListener();
        };*/
    }

    @modelAction
    remove() {
        this.Store.removeCapacity(this);
    }

    @modelAction
    update(json: any) {}
}

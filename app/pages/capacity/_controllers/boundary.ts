import _ from "lodash";
import { comparer, computed, reaction } from "mobx";
import { getRoot, Model, model } from "mobx-keystone";
import { CapacityBoard } from "./_board";
import { ICapacityInterval } from "./view";
import {DateTime as dt} from "luxon"

@model("capacity-boundary")
export class Boundary extends Model({}) {
    onAttachedToRootStore() {
        const sync = reaction(
            () => this.trigger,
            (trigger) => {
                const rows = getRoot<CapacityBoard>(
                    this
                ).Pagination.visibleRows.map((d) => d.id);
                this.CapacityStore.loadBatch(rows, trigger);
            },
            { equals: comparer.structural }
        );

        return () => {
            sync();
        };
    }

    @computed
    get Calendar() {
        return getRoot<CapacityBoard>(this).Calendar;
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get CapacityStore() {
        return getRoot<CapacityBoard>(this).CapacityStore;
    }

    @computed
    get Pagination() {
        return getRoot<CapacityBoard>(this).Pagination;
    }

    @computed
    get dataBoundaries() {
        return _.uniqBy(
            this.CapacityStore.Capacities.map((d) => d.Column).filter((d) => d),
            (d) => d
        ) as ICapacityInterval[];
    }

    @computed
    get emergedBoundaries() {
        return _.differenceBy(
            this.View.Columns,
            this.dataBoundaries,
            (d) => d.ts
        );
    }

    @computed
    get boundariesToFetch() {
        return _.map(this.emergedBoundaries, (d) => ({
            ts: (d.interval.start as dt).toFormat("yyyy-MM-dd"),
            tf: (d.interval.end as dt).toFormat("yyyy-MM-dd"),
        }));
    }

    @computed
    get trigger() {
        return this.boundariesToFetch;
    }
}

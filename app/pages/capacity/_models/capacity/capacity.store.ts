import { normalize } from "~/util";
import {
    Bound,
    CapacityBatchFilter,
    CapacityJson,
} from "@math865a/project-tool.types";
import _ from "lodash";
import { computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { CapacityBoard } from "../../_controllers/_board";
import { ResourceRow } from "../row/resource-row.model";
import { CapacityInterval } from "./capacity-interval";
import { CapacityStats } from "./capacity-stats";
import { CapacityStyle } from "./capacity-style";
import { Capacity } from "./capacity.model";
import { DateTime as dt } from "luxon";

@model("capacity-store")
export class CapacityStore extends Model({
    Capacities: prop<Capacity[]>(() => []),
}) {
    @computed
    get Transport() {
        return getRoot<CapacityBoard>(this).Transport;
    }

    @computed
    get Filter() {
        return getRoot<CapacityBoard>(this).Filter;
    }

    @computed
    get boundaries() {
        return _.map(getRoot<CapacityBoard>(this).View.Columns, (d) => ({
            ts: (d.interval.start as dt).toFormat("yyyy-MM-dd"),
            tf: (d.interval.end as dt).toFormat("yyyy-MM-dd"),
        }));
    }
    @modelAction
    loadBatch(rows: string[], bounds: Bound[]) {
        const filter = this.Filter.filter;
        if (!filter) return null;
        if (bounds.length < 4 || rows.length === 0) return null;
        const batchFilter = new CapacityBatchFilter({
            ...filter,
            rows: rows,
            bounds: bounds,
        });
        this.Transport.loadBatch(batchFilter, this.resolveMany);
    }

    @modelAction
    loadRowBatches = (row: string) => {
        const filter = this.Filter.filter;
        if (!filter) return null;
        if (this.boundaries.length < 4) return null;
        const batchFilter = new CapacityBatchFilter({
            ...filter,
            rows: [row],
            bounds: this.boundaries,
        });
        this.Transport.loadBatch(batchFilter, this.resolveMany);
    };

    @modelAction
    removeCapacity = (Capacity: Capacity) => {
        this.Capacities.splice(this.Capacities.indexOf(Capacity), 1);
    };

    @modelAction
    resolveMany = (jsons: CapacityJson[]) => {
        jsons.forEach((json) => this.resolve(json));
    };

    @modelAction
    resolve(json: CapacityJson) {
        let Row: Capacity | undefined = _.find(
            this.Capacities,
            (d) => d.id === json.id
        );
        if (Row) {
            Row.update(json);
        } else {
            Row = new Capacity({
                ...json,
                Style: new CapacityStyle({}),
                Interval: new CapacityInterval({
                    ts: normalize(json.interval.ts).toMillis(),
                    tf: normalize(json.interval.tf).toMillis(),
                }),
                Stats: new CapacityStats({
                    capacityDuration: json.stats.capacityDuration ?? 0,
                    softBookedDuration: json.stats.softBookedDuration ?? 0,
                    hardBookedDuration: json.stats.hardBookedDuration ?? 0,
                }),
            });
            this.Capacities.push(Row);
        }
    }

    @modelAction
    removeRowCapacities(Row: ResourceRow) {
        this.Capacities = _.filter(
            this.Capacities,
            (d) => !Row.Capacities.includes(d)
        );
    }
}

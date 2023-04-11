import { ResourceRowJson } from "@math865a/project-tool.types";
import { getAvatarName } from "~/util";
import _ from "lodash";
import { comparer, computed, reaction } from "mobx";
import {
    getRoot,
    idProp,
    Model,
    model,
    modelAction,
    prop,
} from "mobx-keystone";
import { CapacityBoard } from "../../_controllers/_board";

@model("resource-row-model")
export class ResourceRow extends Model({
    id: idProp.typedAs<string>(),
    name: prop<string>().withSetter(),
    color: prop<string>().withSetter(),
    resourceTypes: prop<string[]>().withSetter(),
    hasBookings: prop<boolean>(),
}) {
    onAttachedToRootStore() {
        const sync = reaction(
            () => this.isEligible,
            (isEligible, wasEligible) => {
                if (
                    isEligible &&
                    !wasEligible &&
                    this.Capacities.length === 0
                ) {
                    this.CapacityStore.loadRowBatches(this.id);
                } else if (
                    !isEligible &&
                    wasEligible &&
                    this.Capacities.length > 0
                ) {
                    this.CapacityStore.removeRowCapacities(this);
                }
            },
            { equals: comparer.shallow }
        );

        return () => {
            sync();
        };
    }

    @computed
    get RowFilter() {
        return getRoot<CapacityBoard>(this).Filter.RowFilter;
    }

    @computed
    get Store() {
        return getRoot<CapacityBoard>(this).RowStore;
    }

    @computed
    get avatarName() {
        return getAvatarName(this.name);
    }

    @computed
    get ResourceTypes() {
        return this.Store.ResourceTypes.filter((d) =>
            this.resourceTypes.includes(d.id)
        );
    }

    @computed
    get isEligible(): boolean {
        return this.RowFilter.eligibleRows.includes(this);
    }

    @computed
    get CapacityStore() {
        return getRoot<CapacityBoard>(this).CapacityStore;
    }

    @computed
    get Capacities() {
        return _.sortBy(
            this.CapacityStore.Capacities.filter((d) => d.rowId === this.id),
            (d) => d.Interval.ts
        );
    }

    @modelAction
    update(json: ResourceRowJson) {
        this.setName(json.name);
        this.setColor(json.color);
        this.setResourceTypes(json.resourceTypes);
    }
}

import { computed } from "mobx";
import {
    getRoot,
    idProp,
    Model,
    model,
    modelAction,
    prop,
} from "mobx-keystone";
import { CapacityBoard } from "../../_controllers/_board";

@model("resourcetype-row-model")
export class ResourceTypeRow extends Model({
    id: idProp.typedAs<string>(),
    name: prop<string>().withSetter(),
    typeNo: prop<number>().withSetter(),
    resources: prop<string[]>().withSetter(),
    contract: prop<any>().withSetter(),
}) {
    @computed
    get Store() {
        return getRoot<CapacityBoard>(this).RowStore;
    }

    @computed
    get ResourceTypes() {
        return this.Store.Resources.filter((d) =>
            this.resources.includes(d.id)
        );
    }

    @computed
    get CapacityStore() {
        return getRoot<CapacityBoard>(this).CapacityStore;
    }

    @computed
    get Capacities() {
        return this.CapacityStore.Capacities.filter((d) => d.rowId === this.id);
    }

    //ResourceTypeRowJson
    @modelAction
    update(json: any) {
        this.setName(json.name);
        this.setTypeNo(json.typeNo);
        this.setResources(json.resources);
        this.setContract(json.contract);
    }
}

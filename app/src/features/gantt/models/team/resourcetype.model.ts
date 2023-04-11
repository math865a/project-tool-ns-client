import { model, Model, modelAction, prop } from "mobx-keystone";
import { Rate } from "../_shared/rate";
import { ResourceTypeJson } from "../../types";

@model("resourcetype")
export class ResourceType extends Model(
    {
        id: prop<string>(),
        abbrevation: prop<string>("test"),
        name: prop<string>().withSetter(),
        typeNo: prop<number>().withSetter(),
        salesRate: prop<Rate>(),
    },
    {
        valueType: true,
        toSnapshotProcessor(sn) {
            return {
                id: sn.id,
                name: sn.name,
                typeNo: sn.typeNo,
                abbrevation: sn.abbrevation,
                salesRate: {
                    default: sn.salesRate.default,
                    overtime: sn.salesRate.overtime,
                },
            };
        },
    }
) {
    @modelAction
    update(json: ResourceTypeJson) {
        this.setName(json.name);
        this.setTypeNo(json.typeNo);
        this.salesRate.update(json.salesRate);
    }
}

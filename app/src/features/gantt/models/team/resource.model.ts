import { computed } from "mobx";
import {
    model,
    Model,
    modelAction,
    prop
} from "mobx-keystone";
import { Rate } from "../_shared/rate";
import { getAvatarName } from "~/util";
import { ResourceJson } from "../../types";


@model("resource")
export class Resource extends Model(
    {
        id: prop<string>(),
        name: prop<string>().withSetter(),
        color: prop<string>().withSetter(),
        costRate: prop<Rate>(),
    },
    {
        valueType: true,
        toSnapshotProcessor(sn) {
            return {
                id: sn.id,
                name: sn.name,
                color: sn.color,
                costRate: {
                    default: sn.costRate.default,
                    overtime: sn.costRate.overtime,
                },
            };
        },
    }
) {
    @computed
    get avatarName() {
        return getAvatarName(this.name);
    }

    @modelAction
    update(json: ResourceJson) {
        this.setName(json.name);
        this.setColor(json.color);
        this.costRate.update(json.costRate);
    }
}

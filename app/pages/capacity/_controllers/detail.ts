import { Model, model, prop } from "mobx-keystone";

@model("capacity-detail")
export class Detail extends Model({
    activeId: prop<string | null>(null).withSetter(),
}) {}

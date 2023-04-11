import { Model, model, modelAction, prop } from 'mobx-keystone';

@model('rate')
export class Rate extends Model(
    {
        default: prop<number>(0).withSetter(),
        overtime: prop<number>(0).withSetter(),
    },
    { valueType: true }
) {


    @modelAction
    update(json: {default: number, overtime: number}){
        this.setDefault(json.default)
        this.setOvertime(json.overtime)
    }

}

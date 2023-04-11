import { computed } from "mobx";
import { getParent, Model, model, modelAction, prop } from "mobx-keystone";
import { ContextMenu } from "./ContextMenu";

@model("color-menu")
export class ColorMenu extends Model({
    open: prop<boolean>(false).withSetter(),
}){


    @computed
    get Activity(){
        return getParent<ContextMenu>(this)?.Activity
    }

    @modelAction
    handleOpen = () => {
        this.setOpen(true)
    }

    @modelAction
    handleClose = () => {
        this.setOpen(false)

    }

    

}
import { TIMELINE_PADDING } from "gantt/constants";
import _ from 'lodash';
import { computed } from 'mobx';
import {
    Model,
    model,
    modelAction,
    prop,
    rootRef
} from 'mobx-keystone';

@model('dimensions')
export class Dimensions extends Model({
    timelineWidth: prop<number>(300).withSetter(),
    tableWidth: prop<number>(300).withSetter(),
    width: prop<number>(0).withSetter(),
    height: prop<number>(0).withSetter(),
    left: prop<number>(0).withSetter(),
    top: prop<number>(0).withSetter(),
    right: prop<number>(0).withSetter(),
    bottom: prop<number>(0).withSetter(),
    identityWidth: prop<number>(175),
    dialogDimensions: prop<{width: number, height: number}>(() => ({width: 1200, height: 800})).withSetter()
}) {


    @modelAction
    updateDialogDimensions(width: number, height: number){
        this.setDialogDimensions({width: _.round(width), height: _.round(height)});
    }


    @modelAction
    onTimelineResize(dx: number) {
        this.setTimelineWidth(this.width - dx);
        this.setTableWidth(this.width - this.timelineWidth);
    }

    @computed
    get ratio() {
        return _.round(
            this.timelineWidth / (this.tableWidth + this.timelineWidth),
            2
        );
    }

    @computed
    get timelinePadding() {
        return this.timelineWidth * TIMELINE_PADDING;
    }
    

    static ref = rootRef<Dimensions>('dimensionsRef');
}

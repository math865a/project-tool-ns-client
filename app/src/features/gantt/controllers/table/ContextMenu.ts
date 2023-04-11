import { Activity, Assignment } from "gantt-models";
import _ from 'lodash';
import { computed } from 'mobx';
import {
    getRoot,
    Model,
    model,
    modelAction,
    prop
} from 'mobx-keystone';
import { Gantt } from '../Gantt';
import { ColorMenu } from './ColorMenu';

@model('contextMenuPosition')
export class ContextMenuPosition extends Model({
    x: prop<number>(),
    y: prop<number>(),
}) {
    @computed
    get anchorPosition() {
        return {
            left: this.x + 2,
            top: this.y - 6,
        };
    }
}

@model('context-menu')
export class ContextMenu extends Model({
    Position: prop<ContextMenuPosition | null>(null).withSetter(),
    ColorMenu: prop<ColorMenu>(() => new ColorMenu({})),
    activityId: prop<string | null>(null).withSetter(),
    isHovering: prop<boolean>(false).withSetter(),

}) {
    @computed
    get AllotmentStore() {
        return getRoot<Gantt>(this).AllotmentStore;
    }

    @computed
    get ActivityStore() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @computed
    get Activity() {
        const a = _.find(
            this.ActivityStore.Activities,
            (d) => d.id === this.activityId
        );
        if (a) return a;
        return this.AllotmentStore.Assignments.find(d => d.id === this.activityId)
    }

    @modelAction
    handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        const selectedRow = event.currentTarget.getAttribute("data-id");
        const Activity = this.ActivityStore.Activities.find((d) => d.id === selectedRow);
       this.handleOpen(
            event.clientX,
            event.clientY,
            Activity
        );
    };

    @modelAction
    handleOpen = (x: number, y: number, A?: Activity | Assignment) => {
        if (!A) return;
        this.setPosition(new ContextMenuPosition({ x: x, y: y }));
        this.setActivityId(A.id);
        this.setIsHovering(true);
    };

    @modelAction
    handleClose = () => {
        this.setPosition(null);
        this.setActivityId(null);
        this.setIsHovering(false);
        this.ColorMenu.handleClose()
    };

    @computed
    get isOpen() {
        if (this.Position !== null && this.activityId) return true;
        return false
    }
    @modelAction
    createDelivery = () => {
        if (!this.Activity || this.Activity.kind !== "Delivery") return;
        this.ActivityStore.createDelivery(this.Activity.sequence + 1);

        this.handleClose();
    };

    @modelAction
    createTask = () => {
        if (!this.Activity || this.Activity.kind === "Assignment") return;
        const Delivery =
            this.Activity.kind === 'Task'
                ? this.Activity.Parent
                : this.Activity;
        if (!Delivery) return;
        const sequence =
            this.Activity.kind === 'Task'
                ? this.Activity.sequence + 1
                : Delivery.children.length;
        getRoot<Gantt>(this).ActivityStore.createTask(Delivery, sequence);
        this.handleClose();
    };

    @modelAction
    delete() {
        if (!this.Activity) return;
        this.Activity.delete()
        this.handleClose();
        /*if (this.Activity?.maybeCurrent){
            this.ActivityStore.deleteActivity(this.Activity.current)
            this.setActivity(null)
        }
        this.handleClose();*/
    }

    @modelAction
    createAllocation(){
        if (!this.Activity || this.Activity.kind !== "Assignment" || !this.Activity.Task) return;
        const Allocation = this.AllotmentStore.addAllocation(this.Activity, this.Activity.Task.Interval.interval);
        this.handleClose()
    }
}

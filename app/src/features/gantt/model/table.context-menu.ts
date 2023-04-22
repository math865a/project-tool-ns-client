import { makeAutoObservable } from "mobx";
import { GanttTable } from "./table";
import { Activity } from "./activity";
import { MenuPosition } from "./shared";


export class GanttColorMenu {
    ContextMenu: GanttContextMenu;
    open: boolean = false;
    constructor(ContextMenu: GanttContextMenu) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.ContextMenu = ContextMenu;
    }

    handleOpen = () => {
        this.open = true;
    };

    handleClose = () => {
        this.open = false;
    };
}

export class GanttContextMenu {
    Table: GanttTable;
    Position: MenuPosition | null = null;
    Activity: Activity | null = null;
    ColorMenu: GanttColorMenu;
    isHovering: boolean = false;
    constructor(Table: GanttTable) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Table = Table;
        this.ColorMenu = new GanttColorMenu(this);
    }

    get ActivityStore(){
        return this.Table.Gantt.Store.ActivityStore;
    }

    get AssignmentStore(){
        return this.Table.Gantt.Store.AssignmentStore;
    }

    
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

    
    handleOpen = (x: number, y: number, A?: Activity) => {
        if (!A) return;
        this.Position = new MenuPosition(x, y);
        this.Activity = A;
        this.isHovering = true;

    };

    
    handleClose = () => {
        this.Position = null;
        this.Activity = null;
        this.isHovering = false;
        this.ColorMenu.handleClose()
    };

    get isOpen() {
        if (this.Position !== null && this.Activity) return true;
        return false
    }
    
    createDelivery = () => {
        if (!this.Activity || this.Activity.kind !== "Delivery") return;
        this.ActivityStore.createDelivery(this.Activity.Row.sequence + 1);
        this.handleClose();
    };

    
    createTask = () => {
        if (!this.Activity ) return;
        const Delivery =
            this.Activity.kind === 'Task'
                ? this.Activity.Parent
                : this.Activity;
        if (!Delivery) return;
        const sequence =
            this.Activity.kind === 'Task'
                ? this.Activity.Row.sequence + 1
                : Delivery.children.length;
        this.ActivityStore.createTask(Delivery, sequence);
        this.handleClose();
    };

    
    delete() {
        if (!this.Activity) return;
        this.Activity.delete()
        this.handleClose();
    }

}

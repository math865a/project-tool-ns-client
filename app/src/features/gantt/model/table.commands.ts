import _ from "lodash";
import { computed, makeAutoObservable } from "mobx";
import { GanttTable } from "./table";

export interface ICommands {
    details?: boolean;
    createDelivery?: boolean;
    createTask?: boolean;
    delete?: boolean;
    changeColor?: boolean;
    createAllocation?: boolean;
}

export class GanttCommands {
    Table: GanttTable;
    constructor(Table: GanttTable) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Table = Table;
    }

    @computed
    get Activity() {
        return this.Table.ContextMenu.Activity;
    }

    @computed
    get commands(): ICommands {
        switch (this.Activity?.kind) {
            case "Delivery":
                return {
                    details: true,
                    createDelivery: true,
                    createTask: true,
                    delete: true,
                    changeColor: true,
                };
            case "Task":
                return {
                    details: true,
                    createTask: true,
                    delete: true,
                };
            default:
                return {};
        }
    }

    @computed
    get availableCommands() {
        return _.keys(this.commands).filter(
            (d) => this.commands[d as keyof ICommands]
        );
    }
}

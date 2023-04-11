import _ from 'lodash';
import { computed } from 'mobx';
import { getRoot, Model, model } from 'mobx-keystone';
import { Gantt } from '../Gantt';

export interface ICommands {
    details?: boolean;
    createDelivery?: boolean;
    createTask?: boolean;
    delete?: boolean;
    changeColor?: boolean;
    createAllocation?: boolean;
}

@model('table-commands')
export class TableCommands extends Model({}) {
    @computed
    get Table() {
        return getRoot<Gantt>(this).Table;
    }

    @computed
    get Activity() {
        if (this.Table.ContextMenu.Activity) {
            return this.Table.ContextMenu.Activity
        }
        return this.Table.Selection.SelectedActivity;
    }

    @computed
    get commands(): ICommands {
        switch (this.Activity?.kind) {
            case 'Delivery':
                return {
                    details: true,
                    createDelivery: true,
                    createTask: true,
                    delete: true,
                    changeColor: true,
                };
            case 'Task':
                return {
                    details: true,
                    createTask: true,
                    delete: true,
                };
            case "Assignment": {
                return {
                    createAllocation: true,
                    delete: true,
                }
            }
            default:
                return {}
        }
    }

    @computed
    get availableCommands() {
        return _.keys(this.commands).filter(
            (d) => this.commands[d as keyof ICommands]
        );
    }
}

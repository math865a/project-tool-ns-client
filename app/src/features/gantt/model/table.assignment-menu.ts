import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
} from '@mui/material';
import { Activity, GanttTable, MenuPosition, TeamMember } from "gantt-models";
import _ from 'lodash';
import { computed, makeAutoObservable } from 'mobx';
import {
    modelAction
} from 'mobx-keystone';

export class GanttAssignmentMenu{
    Table: GanttTable;
    Activity: Activity | null = null;
    open: boolean = false;
    position: MenuPosition | null;
    
    constructor(Table: GanttTable){
        makeAutoObservable(this, {}, { autoBind: true });
        this.Table = Table;
    }

    @computed
    get AllotmentStore() {
        return this.Table.Gantt.Store.AssignmentStore
    }

    @computed
    get TeamStore() {
        return this.Table.Gantt.Store.TeamStore
    }


    @modelAction
    handleOpen = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        A: Activity
    ) => {
        const rect = event.currentTarget.getBoundingClientRect();
        this.position = new MenuPosition(rect.right,rect.bottom);
        this.Activity = A;
        this.open = true;

    };

    @modelAction
    handleClose = () => {
        this.Activity = null;
        this.open = false;
        this.position = null;

    };

    @computed
    get Selected() {
        const A = this.Activity
        if (A) {
            return A.Team;
        }
        return [];
    }

    @computed
    get Team() {
        return this.TeamStore.TeamMembers
    }

    @computed
    get Options() {
        return _.difference(this.Team, this.Selected);
    }

    @modelAction
    handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: TeamMember[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<TeamMember> | undefined
    ) => {
        const A = this.Activity
        if (!A) return;
        if (details) {
            if (reason === 'selectOption') {
                this.add(details.option, A);
            } else if (reason === 'removeOption') {
                this.remove(details.option, A);
            }
        }
    };

    @modelAction
    add = (TeamMember: TeamMember, Task: Activity) => {
        this.AllotmentStore.addAssignment(TeamMember, Task);
    };

    @modelAction
    remove = (TeamMember: TeamMember, Task: Activity) => {
        const Assignment = Task.Assignments.find(
            (d) => d.TeamMember === TeamMember
        );
        if (Assignment) {
            this.AllotmentStore.deleteAssignment(Assignment);
        }
    };
}

import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
} from '@mui/material';
import { Activity, TeamMember } from "gantt-models";
import _ from 'lodash';
import { computed } from 'mobx';
import {
    Model,
    Ref,
    getRoot,
    model,
    modelAction,
    prop
} from 'mobx-keystone';
import { Gantt } from '../Gantt';

@model('team-menu-position')
export class TeamMenuPosition extends Model({
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

@model('team-menu')
export class TeamMenuModel extends Model({
    Activity: prop<Ref<Activity> | null>(null).withSetter(),
    open: prop<boolean>(false).withSetter(),
    position: prop<TeamMenuPosition | null>(null).withSetter(),
}) {
    @computed
    get AllotmentStore() {
        return getRoot<Gantt>(this).AllotmentStore;
    }

    @computed
    get TeamStore() {
        return getRoot<Gantt>(this).TeamStore;
    }

    @computed
    get Table(){
        return getRoot<Gantt>(this).Table
    }

    @modelAction
    handleOpen = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        A: Activity
    ) => {
        const rect = event.currentTarget.getBoundingClientRect();
        this.setPosition(
            new TeamMenuPosition({ x: rect.right, y: rect.bottom })
        );
        this.setActivity(Activity.ref(A));
        this.setOpen(true);
    };

    @modelAction
    handleClose = () => {
        this.setActivity(null);
        this.setOpen(false);
        this.setPosition(null);
    };

    @computed
    get Selected() {
        const A = this.Activity?.maybeCurrent;
        if (A) {
            return A.Team;
        }
        return [];
    }

    @computed
    get Team() {
        return getRoot<Gantt>(this).TeamStore.TeamMembers;
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
        const A = this.Activity?.maybeCurrent;
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

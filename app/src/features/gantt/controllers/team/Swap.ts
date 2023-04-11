import _ from "lodash";
import { computed } from "mobx";
import { getRoot, Model, model, modelAction, prop } from "mobx-keystone";
import { Gantt } from "../Gantt";
import { TeamMemberJson } from "../../types";

@model("team-swap")
export class TeamSwapDialog extends Model({
    open: prop<boolean>(false).withSetter(),
    teamMemberId: prop<string | null>(null).withSetter(),
    isLoading: prop<boolean>(false).withSetter(),
    options: prop<TeamMemberJson[]>(() => []).withSetter(),
    selected: prop<string | null>(null).withSetter(),
}) {
    @computed
    get ActivityStore() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @computed
    get TeamStore() {
        return getRoot<Gantt>(this).TeamStore;
    }

    @computed
    get Transport() {
        return getRoot<Gantt>(this).Transport;
    }

    @computed
    get TeamMember() {
        return this.TeamStore.TeamMembers.find(
            (d) => d.id === this.teamMemberId
        );
    }

    handleOpen(id: string) {
        this.setTeamMemberId(id);
        this.setOpen(true);
        this.setIsLoading(true);
        this.getOptions();
    }

    @modelAction
    handleClose = () => {
        this.setOpen(false);
        this.setTeamMemberId(null);
        this.setIsLoading(false);
        this.setOptions([]);
        this.setSelected(null);
    };

    @modelAction
    getOptions() {
        this.Transport.getTeamMemberOptions(this.updateOptions);
    }

    @modelAction
    updateOptions = (options: TeamMemberJson[]) => {
        this.setIsLoading(false);
        this.setOptions(options);
    };

    @modelAction
    handleChange(newValue: TeamMemberJson) {
        if (this.selected === newValue.id) {
            this.setSelected(null);
        } else {
            this.setSelected(newValue.id);
        }
    }

    @modelAction
    confirm = () => {
        if (
            !this.selectedOp ||
            !this.TeamMember ||
            !this.ActivityStore.Plan ||
            !this.selected
        )
            return;
        const dto = {
            planId: this.ActivityStore.Plan.id,
            fromAgent: this.TeamMember.id,
            toAgent: this.selected,
        };
        this.TeamStore.resolve(this.selectedOp);
        this.TeamMember.Assignments.forEach((Assignment) => this.selected &&
            Assignment.setAgent(this.selected)
        );
        this.TeamStore.TeamMembers.splice(
            _.indexOf(this.TeamStore.TeamMembers, this.TeamMember),
            1
        );
        this.handleClose();
       // this.Transport.swapTeamMember(dto);
    }

    @computed
    get selectedOption() {
        const selected = this.options.find((d) => d.id === this.selected);
        return selected ? [selected] : [];
    }

    @computed
    get selectedOp() {
        return this.selectedOption[0];
    }
}

import { computed } from "mobx";
import { Model, getParent, getRoot, model } from "mobx-keystone";
import { Socket } from "socket.io-client";
import {
    CreateActivityDto,
    CreateAllocationDto,
    CreateAssignmentDto,
    UpdateActivityColorDto,
    UpdateActivityNameDto,
    UpdateAllocationDto,
    UpdatePeriodDto,
} from "~/src/_definitions";
import { TeamMemberJson } from "../types";
import { Gantt } from "./Gantt";

@model("gantt-transport")
export class Transport extends Model({}) {
    socket: Socket | undefined;

    initializeSocket(socket: Socket) {
        this.socket = socket;
        this.joinRoom();
    }

    joinRoom() {
        this.socket?.emit("join", this.workpackageId);
    }

    @computed
    get workpackageId() {
        return getRoot<Gantt>(this).workpackageId;
    }

    @computed
    get Analysis() {
        return getRoot<Gantt>(this).Analysis;
    }


    createActivity(dto: CreateActivityDto) {
        this.socket?.emit("create:activity", dto);
    }

    deleteActivity(id: string) {
        this.socket?.emit("delete:activity", id);
    }

    updatePeriod(dto: UpdatePeriodDto) {
        this.socket?.emit("update:period", dto);
    }

    updateColor(dto: UpdateActivityColorDto) {
        this.socket?.emit("update:activity-color", dto);
    }

    updateAggregates(dto: any) {
        this.socket?.emit("update:aggregates", dto);
    }

    updateName(dto: UpdateActivityNameDto) {
        this.socket?.emit("update:activity-name", dto);
    }

    removeAssignment(agentId: string, taskId: string) {
        this.socket?.emit("delete:assignment", {
            agentId: agentId,
            taskId: taskId,
        });
    }

    createAssignment(dto: CreateAssignmentDto) {
        this.socket?.emit("create:assignment", dto);
    }

    createAllocation(dto: CreateAllocationDto) {
        this.socket?.emit("create:allocation", dto);
    }

    removeAllocation(allocationId: string) {
        this.socket?.emit("delete:activity", allocationId);
    }

    updateAllocation(dto: UpdateAllocationDto) {
        this.socket?.emit("update:allocation", dto);
    }

    getPlanId() {
        return getRoot<Gantt>(this).planId;
    }

    addTeamMember(agentId: string) {
        const dto = {
            agentId: agentId,
            planId: this.getPlanId(),
        };
        this.socket?.emit("add:teammember", dto);
    }

    deleteTeamMember(agentId: string) {
        const dto = {
            agentId: agentId,
            planId: this.getPlanId(),
        };
        this.socket?.emit("remove:teammember", dto);
    }

    getTeamMemberOptions(callback: (options: TeamMemberJson[]) => void) {
        this.socket?.emit("get:team-options", getRoot<Gantt>(this).workpackageId, (options: TeamMemberJson[]) =>
            callback(options)
        );
    }

    swapTeamMember(fromAgent: string, toAgent: string) {
        this.socket?.emit("swap:teammember", {
            workpackageId: this.workpackageId,
            fromAgent,
            toAgent,
        });
    }
}

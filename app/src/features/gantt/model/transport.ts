import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import {
    CreateActivityDto,
    CreateAllocationDto,
    CreateAssignmentDto,
    UpdateActivityColorDto,
    UpdateActivityDto,
    UpdateActivityNameDto,
    UpdateAllocationDto,
    UpdatePeriodDto,
} from "~/src/_definitions";
import { TeamMemberJson } from "../types";
import { GanttStore } from "./store";
import { IIntervalAsJson } from "./shared";

export class GanttTransport {
    GanttStore: GanttStore;
    socket: Socket | undefined;
    constructor(GanttStore: GanttStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.GanttStore = GanttStore;
    }

    initializeSocket(socket: Socket) {
        this.socket = socket;
        this.joinRoom();
    }

    joinRoom() {
        this.socket?.emit("join", this.GanttStore.workpackageId);
    }

    updateActivity(dto: UpdateActivityDto) {
        this.socket?.emit("update:activity", dto);
    }

    createActivity(dto: CreateActivityDto) {
        this.socket?.emit("create:activity", dto);
    }

    deleteActivity(id: string) {
        this.socket?.emit("delete:activity", id);
    }

    updatePeriod(id: string, json: IIntervalAsJson) {
        this.socket?.emit("update:period", {
            activityId: id,
            startDate: json.start,
            endDate: json.end,
            workDayCount: json.workDayCount,
        });
    }

    updateAggregates(dto: any) {
        this.socket?.emit("update:aggregates", dto);
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

    addTeamMember(agentId: string) {
        const dto = {
            agentId: agentId,
            workpackageId: this.GanttStore.workpackageId,
        };
        this.socket?.emit("add:teammember", dto);
    }

    deleteTeamMember(agentId: string) {
        const dto = {
            agentId: agentId,
            workpackageId: this.GanttStore.workpackageId,
        };
        this.socket?.emit("remove:teammember", dto);
    }

    getTeamMemberOptions(callback: (options: TeamMemberJson[]) => void) {
        this.socket?.emit(
            "get:team-options",
            this.GanttStore.workpackageId,
            (options: TeamMemberJson[]) => callback(options)
        );
    }
}

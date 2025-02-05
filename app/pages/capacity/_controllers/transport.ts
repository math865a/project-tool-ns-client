import { Model, model, modelAction, prop } from "mobx-keystone";
import { Socket } from "socket.io-client";
import {
    CapacityFilterDto,
    CreateCapacityViewDto,
    UpdateCapacityViewDto,
    UpdateCapacityViewNameDto,
    UpdateDefaultCapacityViewDto,
} from "../_definitions";

@model("capacity-board-transport")
export class Transport extends Model({
    isLoading: prop<boolean>(false),
}) {
    socket: Socket | undefined;

    @modelAction
    updateSocket(socket: Socket) {
        this.socket = socket;
    }

    createView(dto: CreateCapacityViewDto) {
        this.socket?.emit("create:view", dto);
    }

    updateName(dto: UpdateCapacityViewNameDto) {
        this.socket?.emit("update:view-name", dto);
    }

    updateDefaultView(dto: UpdateDefaultCapacityViewDto) {
        this.socket?.emit("update:default-view", dto);
    }

    updateView(dto: UpdateCapacityViewDto) {
        this.socket?.emit("update:view", dto);
    }

    deleteView(viewId: string) {
        this.socket?.emit("delete:view", viewId);
    }

    loadBatch(filter: CapacityFilterDto, callback: (data: any[]) => void) {
        this.socket?.emit("get:batch", filter, callback);
    }
}

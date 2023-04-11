import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { ActivityStore, AllotmentStore, TeamStore } from "gantt-models";
import { computed } from "mobx";
import {
    Model,
    model,
    modelAction,
    prop,
    registerRootStore,
    setGlobalConfig,
} from "mobx-keystone";
import React from "react";
import { Socket } from "socket.io-client";
import { GanttData } from "../types";
import { Dimensions } from "./Dimensions";
import { Timeline } from "./Timeline";
import TimelineIntervals from "./Timeline.Intervals";
import { Transport } from "./Transport";
import { GanttAnalysis } from "./analysis/gantt-analysis";
import { GanttTable } from "./table/Table";
import { TeamSwapDialog } from "./team/Swap";
import { TeamMenuModel } from "./team/TeamMenu";
@model("gantt")
export class Gantt extends Model({
    planId: prop<string>(),
    workpackageId: prop<string>(),
    Transport: prop<Transport>(() => new Transport({})),
    ActivityStore: prop<ActivityStore>(() => new ActivityStore({})),
    TeamStore: prop<TeamStore>(() => new TeamStore({})),
    AllotmentStore: prop<AllotmentStore>(() => new AllotmentStore({})),
    Dimensions: prop<Dimensions>(() => new Dimensions({})),
    Timeline: prop<Timeline>(() => new Timeline({})),
    TimelineIntervals: prop<TimelineIntervals>(() => new TimelineIntervals({})),
    TeamMenu: prop<TeamMenuModel>(() => new TeamMenuModel({})),
    Table: prop<GanttTable>(() => new GanttTable({})),
    TeamSwap: prop<TeamSwapDialog>(() => new TeamSwapDialog({})),
    Analysis: prop<GanttAnalysis>(() => new GanttAnalysis({})),
}) {
    @computed
    get isEmpty() {
        return this.ActivityStore.Activities.length === 1;
    }

    @modelAction
    initializeSocket(socket: Socket) {
        this.Transport.initializeSocket(socket);
        return this;
    }

    @modelAction
    registerGridApi(gridApi: React.MutableRefObject<GridApiPro>) {
        this.Table.updateApi(gridApi);
        return this;
    }

    @modelAction
    initializeData({
        activities,
        team,
        assignments,
    }: Pick<GanttData, "activities" | "team" | "assignments">) {
        setGlobalConfig({ allowUndefinedArrayElements: true });
        registerRootStore(this);
        this.ActivityStore.resolveMany(activities);
        this.TeamStore.resolveMany(team);
        this.AllotmentStore.resolveMany(assignments);
        return this;
    }

}

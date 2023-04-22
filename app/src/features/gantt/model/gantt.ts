import { makeAutoObservable } from "mobx";
import { GanttDimensions } from "./dimensions";
import { GanttTimeline } from "./timeline";
import { ActivityJson, AssignmentJson, TeamMemberJson } from "../types";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { GanttStore } from "./store";
import { GanttTable } from "./table";
import { GanttAnalysis } from "./analysis";

interface Props {
    workpackageId: string;
    start: string;
    end: string;
    activities: ActivityJson[];
    assignments: AssignmentJson[];
    team: TeamMemberJson[];
    api: React.MutableRefObject<GridApiPro>;
}

export class Gantt {
    Dimensions: GanttDimensions;
    Table: GanttTable;
    Timeline: GanttTimeline;
    Store: GanttStore;
    Analysis: GanttAnalysis;
    constructor({
        start,
        end,
        api,
        workpackageId,
        ...data
    }: Props) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Dimensions = new GanttDimensions();
        this.Table = new GanttTable(this, api);
        this.Timeline = new GanttTimeline(this, start, end);
        this.Store = new GanttStore(this, data)
        this.Analysis = new GanttAnalysis(this);
    }
}

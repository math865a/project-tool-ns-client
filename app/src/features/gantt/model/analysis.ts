import { makeAutoObservable } from "mobx";
import { Gantt } from "./gantt"
import { PlanningChart } from "./analysis.planning-chart";
import { WorkTimeseries } from "./analysis.work-timeseries";

export class GanttAnalysis {
    Gantt: Gantt;
    PlanningChart: PlanningChart;
    WorkTimeseries: WorkTimeseries;
    constructor(Gantt: Gantt) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Gantt = Gantt;
        this.PlanningChart = new PlanningChart(Gantt);
        this.WorkTimeseries = new WorkTimeseries(Gantt);
    }
}
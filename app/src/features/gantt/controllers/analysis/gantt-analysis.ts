import { Model, model, prop } from "mobx-keystone";
import { PlanTotals } from "./plan-totals";
import { PlanningChartModel } from "./planning-chart-model";
import { TotalTeamWork } from "./team-work";
import { WorkTimesseries } from "./work-timeseries";

@model("gantt-analysis")
export class GanttAnalysis extends Model({
    TotalTeamWork: prop<TotalTeamWork>(() => new TotalTeamWork({})),
    WorkTimeseries: prop<WorkTimesseries>(() => new WorkTimesseries({})),
    PlanningChart: prop<PlanningChartModel>(() => new PlanningChartModel({})),
    PlanTotals: prop<PlanTotals>(() => new PlanTotals({})),
}) {}

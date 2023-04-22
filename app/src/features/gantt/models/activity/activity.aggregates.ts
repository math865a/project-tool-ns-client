import _ from "lodash";
import { comparer, computed, reaction } from "mobx";
import { getParent, getRoot, Model, model, modelAction } from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { Activity } from "./activity";
import { Duration as dur } from "luxon";

@model("activity-aggregates")
export class ActivityAggregates extends Model(
    {},
    {
        valueType: true,
    }
) {
    onAttachedToRootStore() {
        const saveListener = reaction(
            () => this.aggregates,
            (aggregates) => this.save(aggregates),
            { equals: comparer.structural }
        );

        return () => {
            saveListener();
        };
    }

    @computed
    get Parent() {
        return getParent<Activity>(this) as Activity;
    }

    @computed
    get workBreakdown() {
        const defaultMinutes = _.sumBy(
            this.Parent.Assignments,
            (d) => d.timesheet.default
        );
        const overtimeMinutes = _.sumBy(
            this.Parent.Assignments,
            (d) => d.timesheet.overtime
        );
        return {
            defaultWork: defaultMinutes,
            overtimeWork: overtimeMinutes,
            totalWork: defaultMinutes + overtimeMinutes,
        };
    }

    @computed
    get workHoursBreakdown() {
        return _.mapValues(this.workBreakdown, (d) => d / 60);
    }

    @computed
    get workLeft() {
        const parent = getParent<Activity>(this);
        if (!parent) return 0;
        return _.sumBy(parent.Assignments, (d) => d.workHoursLeft);
    }

    @computed
    get workDone() {
        return this.workHoursBreakdown.totalWork - this.workLeft;
    }

    @computed
    get dailyWorkHoursBreakdown() {
        return _.mapValues(
            this.workHoursBreakdown,
            (d) => d / this.Parent.Period.workdayCount
        );
    }

    @computed
    get workCompletedRatio() {
        if (this.workHoursBreakdown.totalWork > 0) {
            return _.round(
                this.workDone / this.workHoursBreakdown.totalWork,
                2
            );
        }
        return 0;
    }

    @computed
    get workLeftRatio() {
        return 1 - this.workCompletedRatio;
    }

    @computed
    get workAggregates() {
        return {
            totals: _.mapValues(this.workHoursBreakdown, (d) =>
                dur.fromObject({ hours: d }).toFormat("hh:mm")
            ),
            daily: _.mapValues(this.dailyWorkHoursBreakdown, (d) =>
                dur.fromObject({ hours: d }).toFormat("hh:mm")
            ),
            status: {
                workLeft: dur
                    .fromObject({ hours: this.workLeft })
                    .toFormat("hh:mm"),
                workDone: dur
                    .fromObject({ hours: this.workDone })
                    .toFormat("hh:mm"),
            },
            statusPercents: {
                workLeft: _.round(this.workLeftRatio * 100, 2) + "%",
                workDone: _.round(this.workCompletedRatio * 100, 2) + "%",
            },
        };
    }

    @computed
    get finance(): any {
        const parent = getParent<Activity>(this);
        if (!parent)
            return {
                cost: 0,
                sales: 0,
                profit: 0,
                coverage: 0,
            };
        const cost = _.sumBy(parent.Assignments, (d) => d.cost);
        const sales = _.sumBy(parent.Assignments, (d) => d.sales);
        const profit = _.sumBy(parent.Assignments, (d) => d.profit);
        let coverage = 0;
        if (sales !== 0) {
            coverage = _.round(profit / sales, 2);
        }
        return {
            cost: cost,
            sales: sales,
            profit: profit,
            coverage: coverage,
        };
    }

    @computed
    get aggregates(): any {
        return {
            work: this.workAggregates,
            finance: this.finance,
        };
    }

    @computed
    get ActivityStore() {
        return getRoot<Gantt>(this).ActivityStore;
    }

    @modelAction
    save(aggregates: any) {
        const parent = getParent<Activity>(this);
        if (!parent) return;
        const dto: any = {
            activityId: parent.id,
            ...aggregates,
        };
        this.ActivityStore.Transport.updateAggregates(dto);
    }
}

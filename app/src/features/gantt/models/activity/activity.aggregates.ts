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
    get work(): any {
        const parent = getParent<Activity>(this);
        if (!parent) {
            return {
                defaultWork: 0,
                overtimeWork: 0,
                totalWork: 0,
            };
        }
        const defaultMinutes = _.sumBy(
            parent.Assignments,
            (d) => d.timesheet.default
        );
        const overtimeMinutes = _.sumBy(
            parent.Assignments,
            (d) => d.timesheet.overtime
        );
        return {
            defaultWork: defaultMinutes,
            overtimeWork: overtimeMinutes,
            totalWork: defaultMinutes + overtimeMinutes,
        };
    }

    @computed
    get totalHours() {
        return this.work.totalWork === 0
            ? "-"
            : dur
                  .fromObject(
                      { minutes: this.work.totalWork },
                      { locale: "da" }
                  )
                  .shiftTo("hours").hours;
    }

    @computed
    get workHours() {
        return {
            default:
                this.work.defaultWork === 0
                    ? "-"
                    : dur
                          .fromObject(
                              { minutes: this.work.defaultWork },
                              { locale: "da" }
                          )
                          .shiftTo("hours", "minutes")
                          .toHuman({
                              listStyle: "short",
                              unitDisplay: "narrow",
                          })
                          .replace("og", "/"),
            overtime:
                this.work.overtimeWork === 0
                    ? "-"
                    : dur
                          .fromObject(
                              { minutes: this.work.overtimeWork },
                              { locale: "da" }
                          )
                          .shiftTo("hours", "minutes")
                          .toHuman({
                              listStyle: "short",
                              unitDisplay: "narrow",
                          })
                          .replace("og", "/"),
            total:
                this.work.totalWork === 0
                    ? "-"
                    : dur
                          .fromObject(
                              { minutes: this.work.totalWork },
                              { locale: "da" }
                          )
                          .shiftTo("hours", "minutes")
                          .toHuman({
                              listStyle: "short",
                              unitDisplay: "narrow",
                          })
                          .replace("og", "/").replace(" m", "min").replace(" t", "t"),
        };
    }

    @computed
    get displayWork(){
        if (this.workHours.total === "0t / 0min"){
            return "-"
        } else if (this.workHours.total.startsWith("0t / ")){
            return this.workHours.total.replace("0t / ", "");
         } else if (this.workHours.total.includes("/ 0min")){
            return this.workHours.total.replace("/ 0min", "");
        } return this.workHours.total
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
            work: this.work,
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

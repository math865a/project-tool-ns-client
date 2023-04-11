import { Model, model, getRoot } from "mobx-keystone";
import { computed } from "mobx";
import { Gantt } from "../Gantt";
import {DateTime as dt} from "luxon"
import _ from "lodash";

@model("work-timeseries")
export class WorkTimesseries extends Model({}) {
    @computed
    get Team() {
        return _.sortBy(
            getRoot<Gantt>(this).TeamStore.TeamMembers,
            (d) => d.resource.name,
            (d) => d.resourceType.name
        );
    }

    @computed
    get isEmpty(){
        return this.data.length === 0 || this.Team.length === 0 || this.Plan === undefined || _.every(this.data, d => d.totalWork === 0)
    }

    @computed
    get Plan() {
        return getRoot<Gantt>(this).ActivityStore.Plan;
    }

    @computed
    get weeks() {
        if (this.Plan) {
            const tightWeeks = this.Plan?.Interval.interval
                .splitBy({ weeks: 1 })
                .map((d) => ({
                    week: (d.start as dt).weekNumber,
                    year: (d.start as dt).year,
                    weekId: String((d.start as dt).weekNumber) + String((d.start as dt).year),
                }));
                return tightWeeks
        }
        return [];
    }

    @computed
    get data() {
        return _.map(this.weeks, (week) => {
            const teamWork = _.map(this.Team, (member) => {
                const work =
                    _.find(member.weeklyWork, (d) => d.weekId === week.weekId)
                        ?.work ?? null;
                return [member.id, work ? _.round(work,1) : null];
            });
            const totalWork = _.sum(_.map(teamWork, (d) => d[1]));

            const teamWorkObj = _.fromPairs(teamWork);
            return {
                ...week,
                ...teamWorkObj,
                totalWork
            };
        });
    }

    @computed
    get yMax(){
        return _.maxBy(this.data, d => d.totalWork)?.totalWork ?? 0
    }

    @computed
    get yDomain(){
        return [0, this.yMax+this.yMax*0.1]
    }

}

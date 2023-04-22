import _ from "lodash";
import { DateTime as dt } from "luxon";
import { makeAutoObservable } from "mobx";
import { Gantt } from "./gantt";

export class WorkTimeseries {
    Gantt: Gantt;
    constructor(Gantt: Gantt) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Gantt = Gantt;
    }

    get Team() {
        return _.sortBy(
            this.Gantt.Store.TeamStore.TeamMembers.filter(
                (d) => d.workStats.timesheet.total > 0
            )
        );
    }

    get isEmpty() {
        return (
            this.data.length === 0 ||
            this.Team.length === 0 ||
            this.Plan === undefined ||
            _.every(this.data, (d) => d.totalWork === 0)
        );
    }

    get Plan() {
        return this.Gantt.Store.ActivityStore.Plan;
    }

    get weeks() {
        if (this.Plan) {
            const tightWeeks = this.Plan?.Interval.interval
                .splitBy({ weeks: 1 })
                .map((d) => ({
                    week: (d.start as dt).weekNumber,
                    year: (d.start as dt).year,
                    weekId:
                        String((d.start as dt).weekNumber) +
                        String((d.start as dt).year),
                }));
            return tightWeeks;
        }
        return [];
    }

    get data() {
        return _.map(this.weeks, (week) => {
            const teamWork = _.map(this.Team, (member) => {
                const work =
                    _.find(member.weeklyWork, (d) => d.weekId === week.weekId)
                        ?.work ?? null;
                return [member.id, work ? _.round(work, 1) : null];
            });
            const totalWork = _.sum(_.map(teamWork, (d) => d[1]));

            const teamWorkObj = _.fromPairs(teamWork);
            return {
                ...week,
                ...teamWorkObj,
                totalWork,
            };
        });
    }

    get yMax() {
        return _.maxBy(this.data, (d) => d.totalWork)?.totalWork ?? 0;
    }

    get yDomain() {
        return [0, this.yMax + this.yMax * 0.1];
    }
}

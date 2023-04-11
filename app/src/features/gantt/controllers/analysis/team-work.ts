import { formatDecimal } from '~/util';
import _ from 'lodash';
import { computed } from 'mobx';
import { getRoot, Model, model } from 'mobx-keystone';
import { Gantt } from '../Gantt';


export interface ITeamPieData {
    id: string;
    name: string;
    work: number;
    color: string;
    percent: number;
}


@model('team-work')
export class TotalTeamWork extends Model({}) {
    @computed
    get TeamStore() {
        return getRoot<Gantt>(this).TeamStore;
    }

    @computed
    get isEmpty(){
        return this.totalWork === 0
    }

    @computed
    get ActivityStore(){
        return getRoot<Gantt>(this).ActivityStore
    }

    @computed
    get totalWork(){
        return _.round(((this.ActivityStore.Plan?.Aggregates.work.totalWork ?? 0)/60),2)
    }

    @computed
    get data(): ITeamPieData[] {
        return this.TeamStore.TeamMembers.filter(d => d.workHours > 0).map((d) => ({
            id: d.id,
            name: d.resource.name,
            work: d.workHours,
            color: d.resource.color,
            percent: _.round((d.workHours/this.totalWork)*100,1)
        }));
    }
}

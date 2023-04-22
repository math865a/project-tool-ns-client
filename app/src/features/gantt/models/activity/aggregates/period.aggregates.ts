import { makeAutoObservable } from "mobx";


export class PeriodAggregates {
    
    constructor(){
        makeAutoObservable(this);
    }

}
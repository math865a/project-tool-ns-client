import _ from 'lodash';
import { DateTime as dt, Interval as int } from 'luxon';
import { computed, reaction } from 'mobx';
import { Model, getParent, getRoot, model, modelAction } from 'mobx-keystone';
import { getDateTime, normalize } from '~/util/time';
import { Gantt } from '../../controllers/Gantt';
import { Activity } from './activity';

@model('activity-period')
export class ActivityPeriod extends Model(
    {},
    {
        valueType: true,
    }
) {

    onAttachedToRootStore(){
        const encloseChildren = reaction(() => this.Activity?.Children, (Children, prev) => {
            if (Children?.length !== prev?.length){
                this.encloseChildren()
            }
        } )
        return () => {
            encloseChildren()
        }
    }


    @computed
    get Activity() {
        return getParent<Activity>(this)
    }

    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    @computed
    get periodState() {
        if (!this.Timeline.xScale ||!this.Activity) return {
            start: dt.now(),
            end: dt.now().plus({months: 1})
        }
        return {
            start: getDateTime(
                this.Timeline.xScale.invert(this.Activity.Bar.coord.x)
            ),
            end: getDateTime(
                this.Timeline.xScale.invert(
                    this.Activity.Bar.coord.x + this.Activity.Bar.coord.w
                )
            ),
        };
    }

    @computed
    get displayInterval() {
        return this.periodState.start.toFormat("d/M/yy") + "-" + this.periodState.end.toFormat("d/M/yy")
    }

    @computed
    get intervalState(){
        return int.fromDateTimes(this.periodState.start, this.periodState.end)
    }

    @computed
    get workdays() {
        return _.filter(
            this.intervalState.splitBy({ days: 1 }),
            (d) => ![6, 7].includes((d.start as dt).weekday)
        )
    }

    @computed
    get workdayCount() {
        return this.workdays.length;
    }

    @modelAction
    handleDatePickerChange = (values: [dt | null, dt | null]) => {
        if (!this.Activity) return;
        let start: dt = this.Activity.Interval.startDate;
        let end: dt = this.Activity.Interval.endDate;
        if (values[0]) {
            start = normalize(values[0]);
            /*this.Activity.Interval.setStart({
                day: values[0].day,
                month: values[0].month,
                year: values[0].year,
            });*/
        }
        if (values[1]) {
            end = normalize(values[1]);
            /*this.Activity.Interval.setEnd({
                day: values[1].day,
                month: values[1].month,
                year: values[1].year,
            });*/
        }
        const period = int.fromDateTimes(
            dt.min(start, end),
            dt.max(start, end)
        );

        this.Activity.Interval.updatePeriod(period);
        this.Activity.Children.forEach((Child) =>
            Child.Period.alignWithParent(period)
        );
        if (this.Activity.Parent) {
            this.Activity.Parent.Period.encloseChildren();
        }
    };

    @modelAction
    encloseChildren() {
        if (!this.Activity)return;
        const childDates = this.Activity.Children.map((child) => [
            child.Interval.startDate,
            child.Interval.endDate,
        ])
            .flat()
            .filter((d) => d) as dt[];
        const minDate = dt.min(...childDates);
        const maxDate = dt.max(...childDates);
        this.Activity.Interval.updatePeriod(
            int.fromDateTimes(minDate, maxDate)
        );
    }

    @modelAction
    updateChildPeriods(period: int) {
        if (!this.Activity) return;
        this.Activity.Children.forEach((child) =>
            child.Interval.updatePeriod(period)
        );
    }

    @modelAction
    alignWithParent(period: int) {
        if (!this.Activity)return;
        let ds = this.Activity.Interval.startDate;
        let df = this.Activity.Interval.endDate;
        const dur = df.diff(ds);
        if (ds <= (period.start as dt)) {
            ds = period.start as dt;
            df = dt.min(ds.plus(dur), period.end as dt);
        } else if (df >= (period.end as dt)) {
            df = period.end as dt;
            ds = dt.max(df.minus(dur), period.start as dt);
        }
        const newPeriod = int.fromDateTimes(ds, df);
        if (!newPeriod.equals(this.Activity.Interval.interval)) {
            this.Activity.Interval.updatePeriod(newPeriod);
            this.Activity.Children.forEach((Child) =>
                Child.Period.alignWithParent(newPeriod)
            );
        }
    }
}

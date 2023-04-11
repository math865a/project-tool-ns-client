import { scaleLinear, scaleUtc } from '@visx/scale';
import { computed } from 'mobx';
import { getRoot, Model, model, prop } from 'mobx-keystone';
import { TimelineController } from './controller';

@model('timeline-dimensions')
export class TimelineDimensions extends Model({
    chartWidth: prop<number>(600).withSetter(),
}) {
    @computed
    get Calendar() {
        return getRoot<TimelineController>(this).Calendar;
    }

    @computed
    get xScale() {
        return scaleUtc({
            domain: [this.Calendar.tStart, this.Calendar.tEnd],
            range: [0, this.chartWidth],
        });
    }

    @computed
    get tScale() {
        return scaleLinear({
            range: [0, this.chartWidth],
            domain: [0, this.Calendar.t],
        });
    }



}

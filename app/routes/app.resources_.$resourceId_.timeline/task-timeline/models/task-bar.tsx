import { computed } from 'mobx';
import { getParent, getRoot, Model, model, prop } from 'mobx-keystone';
import { TimelineController } from '../controllers/controller';
import { ROW_PADDING } from '../controllers/_constants';
import { TimelineTask } from './task.model';

@model('timeline-task-bar')
export class TimelineTaskBar extends Model(
    {
        y: prop<number>(() => ROW_PADDING).withSetter(),
    },
    {
        valueType: true,
    }
) {
    @computed
    get Task() {
        return getParent<TimelineTask>(this) as TimelineTask;
    }

    @computed
    get Dimensions() {
        return getRoot<TimelineController>(this).Dimensions;
    }

    @computed
    get x1() {
        return this.Dimensions.xScale(this.Task.Period.dtStart.toMillis());
    }

    @computed
    get x2() {
        return this.Dimensions.xScale(this.Task.Period.dtEnd.toMillis());
    }

    @computed
    get w() {
        return this.x2 - this.x1;
    }
/*
    @computed
    get y() {
        return ROW_PADDING / 1.5;
    }*/
}

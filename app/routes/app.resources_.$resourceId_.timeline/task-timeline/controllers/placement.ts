import { getRoot, Model, model } from 'mobx-keystone';
import {
    IPoint,
    IGridspan,
    getRect,
    isColliding,
    addVectors,
} from '~/util';
import { TimelineTaskBar } from '../models/task-bar';
import _ from 'lodash';
import { computed, toJS } from 'mobx';
import { TimelineController } from './controller';
import { ROW_PADDING, BAR_HEIGHT } from './_constants';

@model('timeline-placement')
export class TimelinePlacement extends Model({}) {
    @computed
    get Dimensions() {
        return getRoot<TimelineController>(this).Dimensions;
    }

    placeTasks(tasks: TimelineTaskBar[]) {
        _.forEach(tasks, (d) => d.setY(this.conform(d, tasks).y));
    }

    isPointAvailable(p: IPoint, d: IPoint, rects: IGridspan[]) {
        const isInBounds = p.y >= 0;
        const rect = getRect(p, d);
        const isNotColliding = !rects.some((d) => isColliding(d, rect));
        return isInBounds && isNotColliding;
    }

    conform(task: TimelineTaskBar, tasks: TimelineTaskBar[]) {
        const groundedStacks = toJS(
            _.map(
                _.filter(tasks, (d) => d !== task),
                (d) =>
                    toJS({
                        x1: d.x1,
                        x2: d.x2,
                        y1: d.y,
                        y2: d.y + BAR_HEIGHT,
                    })
            )
        );

        const pi = toJS({
            x: task.x1,
            y: ROW_PADDING,
        });
        const d = toJS({ x: task.w, y: BAR_HEIGHT });

        if (this.isPointAvailable(pi, d, groundedStacks)) {
            return pi;
        }

        const effect = {
            x: 0,
            y: ROW_PADDING,
        };

        let p = _.clone(pi);
        for (let i = 0; i < 100; i++) {
            p = addVectors(p, effect);
            if (this.isPointAvailable(p, d, groundedStacks)) {
                break;
            }
        }
        return p;
    }
}

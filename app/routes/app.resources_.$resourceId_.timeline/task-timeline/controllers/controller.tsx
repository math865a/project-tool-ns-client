import { Model, model, prop } from 'mobx-keystone';
import { TimelineStore } from '../models/store';
import { TimelineCalendar } from './calendar';
import { TimelineDimensions } from './dimensions';
import { TimelinePlacement } from './placement';

@model('timeline-controller')
export class TimelineController extends Model({
    Store: prop<TimelineStore>(() => new TimelineStore({})),
    Calendar: prop<TimelineCalendar>(() => new TimelineCalendar({})),
    Dimensions: prop<TimelineDimensions>(() => new TimelineDimensions({})),
    Placement: prop<TimelinePlacement>(() => new TimelinePlacement({})),
}) {}

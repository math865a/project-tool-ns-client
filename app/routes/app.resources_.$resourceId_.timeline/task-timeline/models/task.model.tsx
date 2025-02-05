import { idProp, Model, model, prop } from "mobx-keystone";
import { TimelineTaskBar } from "./task-bar";
import { TimelineTaskPeriod } from "./task-period";
import { TimelineTaskWork } from "./task-work";

@model("timeline-task")
export class TimelineTask extends Model({
    id: idProp.typedAs<string>(),
    taskName: prop<string>(),
    deliveryName: prop<string>(),
    color: prop<string>(),
    Period: prop<TimelineTaskPeriod>(),
    Work: prop<TimelineTaskWork>(),
    Bar: prop<TimelineTaskBar>(() => new TimelineTaskBar({})),
    isHovering: prop<boolean>(false).withSetter(),
}) {}

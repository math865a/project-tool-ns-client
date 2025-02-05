import _ from "lodash";
import { Model, model, modelAction, prop } from "mobx-keystone";
import { TimelineTaskPeriod } from "./task-period";
import { TimelineTaskWork } from "./task-work";
import { TimelineTask } from "./task.model";
import { TimelineWorkpackage } from "./workpackage.model";

@model("timeline-store")
export class TimelineStore extends Model({
    Workpackages: prop<TimelineWorkpackage[]>(() => []),
}) {
    @modelAction
    resolveMany(workpackages: any[]) {
        workpackages.forEach((workpackage) => this.resolve(workpackage));
    }

    @modelAction
    resolve(workpackage: any) {
        let Model = _.find(this.Workpackages, (d) => d.id === workpackage.id);
        if (Model) {
            Model.update(workpackage);
        } else {
            Model = this.createWorkpackageModel(workpackage);
            this.Workpackages.push(Model);
        }
    }

    @modelAction
    createWorkpackageModel(json: any) {
        return new TimelineWorkpackage({
            id: json.id,
            name: json.name,
            systematicName: json.systematicName,
            projectManager: json.projectManager,
            stage: json.stage,
            bookingStage: json.bookingStage,
            Tasks: json.tasks.map(
                (task: any) =>
                    new TimelineTask({
                        id: task.id,
                        taskName: task.taskName,
                        deliveryName: task.deliveryName,
                        Period: new TimelineTaskPeriod(task.period),
                        Work: new TimelineTaskWork(task.work),
                        color: task.color,
                    })
            ),
        });
    }
}

import { BookingStageNode, ProjectManager, StageNode, TimelineWorkpackageJson } from "@math865a/project-tool.types";
import _ from "lodash";
import { computed } from "mobx";
import { getRoot, idProp, model, Model, modelAction, prop } from "mobx-keystone";
import { TimelineController } from "../controllers/controller";
import { BAR_HEIGHT, ROW_PADDING} from "../controllers/_constants";
import { TimelineTask } from "./task.model";

@model("timeline-workpackage")
export class TimelineWorkpackage extends Model({
    id: idProp.typedAs<string>(),
    name: prop<string>(),
    systematicName: prop<string>(),
    projectManager: prop<ProjectManager>(),
    stage: prop<StageNode>(),
    bookingStage: prop<BookingStageNode>(),
    Tasks: prop<TimelineTask[]>()
}){

    @computed
    get Placement(){
        return getRoot<TimelineController>(this).Placement
    }

    onAttachedToRootStore(){
        this.Placement.placeTasks(this.Tasks.map(d => d.Bar))
    }

    @computed
    get h(){
        return (_.maxBy(this.Tasks, d => d.Bar.y)?.Bar.y ?? 0) + BAR_HEIGHT + (2*ROW_PADDING)
    }

    @computed
    get work(){
        return _.sumBy(this.Tasks, d => d.Work.work)
    }

    @computed
    get displayWork(){
        return `${this.work} timer`
    }

    @computed
    get isHoveringTask(){
        return _.some(this.Tasks, d => d.isHovering)
    }

    @modelAction
    update(json: TimelineWorkpackageJson){

    }

}
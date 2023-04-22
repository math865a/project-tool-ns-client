import { makeAutoObservable } from "mobx";
import { Assignment } from "./assignment.model";
import { Interval as int, DateTime as dt } from "luxon";
import _ from "lodash";
import { Allocation, AllocationBar } from "../allocation";

export class AssignmentCanvas {
    Assignment: Assignment;
    isDragging: boolean = false;
    constructor(Assignment: Assignment) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Assignment = Assignment;
    }

    addAllocation = (days: int) => {
        if (!this.Assignment.Task) return;
        let start = dt.max(
            days.start as dt,
            this.Assignment.Task.Interval.interval.start as dt
        );
        let end = dt.min(
            days.end as dt,
            this.Assignment.Task.Interval.interval.end as dt
        );

        if (start === end) {
            if (start === this.Assignment.Task.Interval.interval.start) {
                end = end.plus({ days: 1 });
            } else {
                start = start.minus({ days: 1 });
            }
        }

        const Allocation = this.Assignment.Store.addAllocation(
            this.Assignment,
            this.Assignment.Task.Interval
        );
        return Allocation.id;
    };

    private get Dimensions() {
        return this.Assignment.Store.GanttStore.Gantt.Dimensions;
    }

    get TaskBar() {
        return this.Assignment?.Task?.Bar;
    }

    get tCoord() {
        if (!this.TaskBar)
            return {
                x1: 0,
                x2: 0,
                y: 0,
                h: 0,
                w: 0,
            };
        return this.TaskBar.rect;
    }

    get inBounds() {
        if (!this.TaskBar) {
            return {
                x: 0,
                w: 0,
            };
        }
        return {
            x: this.TaskBar.rect.x1,
            w: this.TaskBar.rect.w,
        };
    }

    get outOfBounds() {
        if (!this.TaskBar) {
            return {
                start: {
                    x: 0,
                    w: 0,
                },
                end: {
                    x: 0,
                    w: 0,
                },
            };
        }
        return {
            start: {
                x: 0,
                w: this.tCoord.x1 - 7.5,
            },
            end: {
                x: this.tCoord.x1 + this.tCoord.w + 7.5,
                w:
                    this.Dimensions.timelineWidth -
                    this.tCoord.x1 +
                    this.tCoord.w,
            },
        };
    }

    get isDraggingAllocation() {
        return _.some(
            this.Assignment.Allocations,
            (d) => d.Bar.Delta.event !== null
        );
    }

    get isHoveringAllocation() {
        return _.some(
            this.Assignment.Allocations,
            (d) => d.Interaction.isHoveringBar
        );
    }

    get selectionColor() {
        return this.Assignment?.TeamMember?.Resource.color ?? "#CECECE";
    }
}

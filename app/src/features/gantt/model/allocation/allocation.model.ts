import { makeAutoObservable } from "mobx";
import { AllocationJson } from "../../types";
import { Assignment } from "../assignment/assignment.model";
import { GanttInteraction, GanttInterval, IIntervalAsJson } from "../shared";
import { Timesheet } from "./allocation.timesheet";
import { color } from "d3-color";
import { getContrastColor } from "~/util";
import { AllocationBar } from "./allocation.bar";

export class Allocation {
    Assignment: Assignment;
    id: string;
    Timesheet: Timesheet;
    Interval: GanttInterval;
    Interaction: GanttInteraction;
    Bar: AllocationBar;

    constructor(Assignment: Assignment, json: AllocationJson) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.Assignment = Assignment;
        this.id = json.id;
        this.Interval = new GanttInterval(
            json.interval.start,
            json.interval.end,
            this.handleDateChange
        );
        this.Timesheet = new Timesheet(this.Interval, json.timesheet);
        this.Interaction = new GanttInteraction();
        this.Bar = new AllocationBar(this);
    }

    get fill() {
        const col = this.Assignment?.TeamMember?.Resource.color;
        if (col) {
            const darker = color(col)?.darker(0.65).formatHex();
            const brighter = color(col)?.brighter(2).formatHex();
            const contrast = getContrastColor(col);
            return {
                color: contrast,
                darker: darker,
                brighter: brighter,
                background: col,
                border: contrast === "#000000" ? brighter : darker,
            };
        }
        return {
            color: "",
            darker: "",
            brighter: "",
            border: "",
        };
    }

    handleDateChange = (interval: IIntervalAsJson) => {
        this.Assignment.Store.Transport.updatePeriod(this.id, interval);
    };

    update(json: AllocationJson) {
        this.id = json.id;
        this.Timesheet = new Timesheet(this.Interval, json.timesheet);
        this.Interval = new GanttInterval(
            json.interval.start,
            json.interval.end,
            this.handleDateChange
        );
    }
}

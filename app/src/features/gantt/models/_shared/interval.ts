import { getDateObject, getDateTime, getDatetimeFromObject } from "~/util/time";
import { type DateRange } from "@mui/x-date-pickers-pro";
import _ from "lodash";
import { type DateObjectUnits, DateTime as dt, Interval as int } from "luxon";
import { computed } from "mobx";
import {
    getParent,
    getRoot,
    model,
    Model,
    modelAction,
    onSnapshot,
    prop,
} from "mobx-keystone";
import { Gantt } from "../../controllers/Gantt";
import { UpdatePeriodDto } from "~/src";

@model("interval")
export class Interval extends Model(
    {
        start: prop<DateObjectUnits>().withSetter(),
        end: prop<DateObjectUnits>().withSetter(),
    },
    {
        valueType: true,
        toSnapshotProcessor(sn) {
            return {
                startDate: getDatetimeFromObject(sn.start).toFormat(
                    "yyyy-MM-dd"
                ),
                endDate: getDatetimeFromObject(sn.end).toFormat("yyyy-MM-dd"),
            };
        },
    }
) {
    @computed
    get Timeline() {
        return getRoot<Gantt>(this).Timeline;
    }

    @computed
    get startDate() {
        return getDatetimeFromObject(this.start).setZone("utc").setLocale("da");
    }

    @computed
    get endDate() {
        return getDatetimeFromObject(this.end).setZone("utc").setLocale("da");
    }

    @computed
    get toDatabase() {
        return {
            startDate: this.startDate.toFormat("yyyy-MM-dd"),
            endDate: this.endDate.toFormat("yyyy-MM-dd"),
        };
    }

    @computed
    get sNorm() {
        return this.startDate.toMillis();
    }

    @computed
    get fNorm() {
        return this.endDate.toMillis();
    }

    @computed
    get interval() {
        return int.fromDateTimes(this.startDate, this.endDate);
    }

    @computed
    get dt() {
        return this.interval.toDuration("milliseconds").milliseconds;
    }

    @computed
    get days() {
        return this.interval.splitBy({ days: 1 });
    }

    @computed
    get dayCount() {
        return this.days.length;
    }

    @computed
    get workdays() {
        return _.filter(
            this.days,
            (d) => ![6, 7].includes((d.start as dt).weekday)
        );
    }

    @computed
    get displayInterval() {
        return (
            this.startDate.toFormat("dd/MM/yy") +
            " - " +
            this.endDate.toFormat("dd/MM/yy")
        );
    }

    @computed
    get workdayCount() {
        return this.workdays.length;
    }

    @computed
    get datePickerValue(): DateRange<dt> {
        return [this.startDate, this.endDate];
    }

    @computed
    get tArr() {
        return [this.sNorm, this.fNorm];
    }

    onAttachedToRootStore() {
        onSnapshot(this, (snapshot) => this.save(snapshot));
    }

    @modelAction
    updatePeriodFromCoords(x: number, w: number) {
        const ts = this.Timeline.xScale.invert(x);
        const tf = this.Timeline.xScale.invert(x + w);
        const period = int.fromDateTimes(getDateTime(ts), getDateTime(tf));
        this.updatePeriod(period);
    }

    @modelAction
    updatePeriod(period: int) {
        this.setStart(getDateObject(period.start as dt));
        this.setEnd(getDateObject(period.end as dt));
    }

    @modelAction
    save(snapshot: { startDate: string; endDate: string }) {
        const parent = getParent<{ id: string }>(this);
        if (!parent) return;

        getRoot<Gantt>(this).ActivityStore.Transport.updatePeriod(
            new UpdatePeriodDto(parent.id, snapshot.startDate, snapshot.endDate)
        );
    }

    @modelAction
    update(startDate: DateObjectUnits, endDate: DateObjectUnits) {
        this.setStart(startDate);
        this.setEnd(endDate);
    }

    @modelAction
    handleDatePickerChange = (values: [dt | null, dt | null]) => {
        let start: dt = this.startDate;
        let end: dt = this.endDate;
        if (values[0]) {
            start = values[0];
            this.setStart({
                day: values[0].day,
                month: values[0].month,
                year: values[0].year,
            });
        }
        if (values[1]) {
            end = values[1];
            this.setEnd({
                day: values[1].day,
                month: values[1].month,
                year: values[1].year,
            });
        }

        const newStart = dt.min(start, end);
        const newEnd = dt.max(start, end);

        this.setStart(getDateObject(newStart));
        this.setEnd(getDateObject(newEnd));
    };
}

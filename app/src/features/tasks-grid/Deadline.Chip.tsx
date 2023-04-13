import { Chip } from "@mui/material";
import { DurationLikeObject, DateTime as dt, Duration as dur } from "luxon";
import { forwardRef, useMemo } from "react";
import { ITask } from "~/src/_definitions";

export const DeadlineChip = forwardRef<HTMLDivElement, { task: ITask }>(
    ({ task }, ref) => {
        const due = useMemo(() => {
            return dt
                .fromISO(task.end)
                .diff(dt.now(), undefined, { conversionAccuracy: "longterm" });
        }, [task]);
        //            return Math.round(dt.fromISO(task.end).diff(dt.now(), "days").days);

        function getSuffix(val: number) {
            const prefix = val > 0 ? "Om " : "";
            const suff = val > 0 ? "" : " siden";
            return { prefix, suff };
        }

        function getStr(value: number, strUnit: string) {
            const { prefix, suff } = getSuffix(value);
            return prefix + Math.abs(value) + " " + strUnit + suff;
        }

        function getText(d: dur, unit: keyof DurationLikeObject) {
            const value = Math.round(d.shiftTo(unit).get(unit));

            switch (unit) {
                case "months":
                    if (value === -1) {
                        return "Sidste måned";
                    } else if (value === 1) {
                        return "Næste måned";
                    }
                    return getStr(value, "mdr.");

                case "weeks":
                    if (value === -1) {
                        return "Sidste uge";
                    } else if (value === 1) {
                        return "Næste uge";
                    }
                    return getStr(value, "uger");

                case "days":
                    if (value === -1) {
                        return "I går";
                    } else if (value === 1) {
                        return "I morgen";
                    } else if (value === 0) {
                        return "I dag";
                    }
                    return getStr(value, "dage");
                default:
                    return "";
            }
        }

        const dueDisplay = useMemo(() => {
            if (
                due > dur.fromObject({ weeks: 8 }) ||
                due < dur.fromObject({ weeks: 8 }).negate()
            ) {
                return {
                    title: getText(due, "months"),
                    color: "transparent",
                };
            } else if (
                due > dur.fromObject({ weeks: 2 }) ||
                due < dur.fromObject({ weeks: 2 }).negate()
            ) {
                return {
                    title: getText(due, "weeks"),
                    color: "transparent",
                };
            } else {
                return {
                    title: getText(due, "days"),
                    color: "transparent",
                };
            }
        }, [due]);

        return (
            <Chip
                ref={ref}
                sx={{
                    fontSize: 11,
                    backgroundColor: dueDisplay.color + "60",
                    borderRadius: 1,
                    color: "#000",
                }}
                size="small"
                label={dueDisplay.title}
            />
        );
    }
);

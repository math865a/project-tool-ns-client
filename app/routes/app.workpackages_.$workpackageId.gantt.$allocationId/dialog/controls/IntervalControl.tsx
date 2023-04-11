import { Box, Typography } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { DateTime as dt } from "luxon";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormUI, PickerDay } from "~/src/design-system";
import { getDateTime } from "~/util/time";
import { Allocation } from "gantt-models";

const IntervalControl = observer(
    ({ Allocation, allowed }: { Allocation: Allocation; allowed: boolean }) => {
        const { control, setValue } = useFormContext();

        const startDate = useWatch({ control, name: "startDate" });
        const endDate = useWatch({ control, name: "endDate" });

        const value: DateRange<dt> = useMemo(() => {
            return [getDateTime(startDate), getDateTime(endDate)];
        }, [startDate, endDate]);

        const handleChange = (value: DateRange<dt>) => {
            if (value[0]) {
                setValue("startDate", value[0].setZone("utc").toISODate(), {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                });
            }
            if (value[1]) {
                setValue("endDate", value[1].setZone("utc").toISODate(), {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                });
            }
        };

        return (
            <Box flexGrow={1} display="flex" pl={2}>
                <FormUI.Label label="Periode" fullWidth>
                    {allowed ? (
                        <Box flexGrow={1} pt={1.5}>
                            <DateRangePicker
                                minDate={
                                    Allocation.Assignment?.Task?.Interval
                                        .startDate
                                }
                                maxDate={
                                    Allocation.Assignment?.Task?.Interval
                                        .endDate
                                }
                                value={value}
                                onChange={handleChange}
                                displayWeekNumber
                                slots={{ day: PickerDay }}
                                sx={{
                                    "& .MuiDateRangeCalendar-monthContainer": {
                                        px: 1,
                                        textTransform: "capitalize",
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        <Typography>
                            {Allocation.Interval.displayInterval}
                        </Typography>
                    )}
                </FormUI.Label>
            </Box>
        );
    }
);

export default IntervalControl;

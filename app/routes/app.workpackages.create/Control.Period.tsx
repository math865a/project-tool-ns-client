import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { DateTime as dt } from "luxon";
import { Box } from "@mui/material";
import { FormUI, PickerDay } from "~/src/design-system";

export default function PeriodControl() {
    const { control, setValue } = useFormContext();
    const startDate = useWatch({ name: "startDate", control });
    const endDate = useWatch({ name: "endDate", control });

    const start = useMemo(() => {
        return dt.fromISO(startDate);
    }, [startDate]);

    const end = useMemo(() => {
        return dt.fromISO(endDate);
    }, [endDate]);

    const handleChange = (date: DateRange<dt>) => {
        const [pickedStart, pickedEnd] = date;
        let startDate = start;
        let endDate = end;
        if (pickedStart) {
            startDate = pickedStart;
        }
        if (pickedEnd) {
            endDate = pickedEnd;
        }
        const newStart = dt.min(startDate, endDate);
        const newEnd = dt.max(startDate, endDate);
        setValue("startDate", newStart.toISODate());
        setValue("endDate", newEnd.toISODate());
    };

    return (
        <Box flexGrow={1}>
            <FormUI.Label label="Periode" widthFrac={2}>
                <Box pt={1}>
                    <DateRangePicker
                        format="dd/MM/yyyy"
                        value={[start, end]}
                        onChange={handleChange}
                        displayWeekNumber
                        slots={{ day: PickerDay }}
                        slotProps={{
                            desktopPaper: { sx: { px: 1, borderRadius: 4 } },
                            textField: { variant: "outlined", size: "small" },
                        }}
                        sx={{
                            "& .MuiDateRangeCalendar-monthContainer": {
                                px: 1,
                                textTransform: "capitalize",
                            },
                        }}
                    />
                </Box>
            </FormUI.Label>
        </Box>
    );
}

/*renderInput={(startProps, endProps) => (
                            <>
                                <TextField
                                    {...startProps}
                                    variant="outlined"
                                    size="small"
                                    label="Startdato"

                                />
                                <Box sx={{ mx: 2 }}> til </Box>
                                <TextField
                                    {...endProps}
                                    variant="outlined"
                                    size="small"
                                    label="Slutdato"
                                />
                            </>
                        )}*/

import { Box, Menu } from "@mui/material";
import { DateRange, DateRangeCalendar } from "@mui/x-date-pickers-pro";
import { DateTime as dt } from "luxon";
import { useMemo } from "react";
import { Action, PickerDay } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { IconCalendar } from "@tabler/icons-react";

export default function PeriodAction({
    updatePeriod,
    period,
}: {
    updatePeriod: (period: DateRange<dt>) => void;
    period: { start: dt; end: dt };
}) {
    const displayPeriod = useMemo(() => {
        return (
            period.start.toFormat("dd-MM-yyyy") +
            " til " +
            period.end.toFormat("dd-MM-yyyy")
        );
    }, [period.start, period.end]);

    const dateRange = useMemo(() => {
        return [period.start, period.end];
    }, [period.start, period.end]);

    const { handleOpen, ...menuProps } = useMenuState();

    return (
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
            <Action.TextButton
                icon={IconCalendar}
                text={displayPeriod}
                onClick={handleOpen}
                ptText={0.25}
            />

            <Menu {...menuProps}>
                <DateRangeCalendar
                    value={dateRange as DateRange<dt>}
                    onChange={updatePeriod}
                    displayWeekNumber
                    calendars={2}
                    slots={{ day: PickerDay }}
                    sx={{
                        "& .MuiDateRangeCalendar-monthContainer": {
                            px: 1,
                            textTransform: "capitalize",
                        },
                    }}
                />
            </Menu>
        </Box>
    );
}

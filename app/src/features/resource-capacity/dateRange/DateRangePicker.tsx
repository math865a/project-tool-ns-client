import { Menu } from "@mui/material";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro";
import { Action, PickerDay } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { useCapacityCharts } from "../_state";
import { IconCalendar } from "@tabler/icons-react";

export function DateRangePicker() {
    const {
        dateRange: { displayRange, updateDateRange, dateRange },
    } = useCapacityCharts();

    const { handleOpen, ...menuProps } = useMenuState();

    return (
        <>
            <Action.TextButton
                icon={IconCalendar}
                text={displayRange}
                onClick={handleOpen}
                reverse
                textProps={{ fontWeight: "bold", fontSize: 12 }}
            />

            <Menu
                {...menuProps}
                PaperProps={{
                    sx: { px: 1, borderRadius: 4, backgroundColor: "#fff" },
                }}
            >
                <DateRangeCalendar
                    value={dateRange}
                    onChange={updateDateRange}
                    displayWeekNumber
                    calendars={3}
                    slots={{ day: PickerDay }}
                    sx={{
                        "& .MuiDateRangeCalendar-monthContainer": {
                            px: 1,
                            textTransform: "capitalize",
                        },
                    }}
                />
            </Menu>
        </>
    );
}

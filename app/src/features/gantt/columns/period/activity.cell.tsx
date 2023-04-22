import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import { Box, Menu, Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { DateRange, DateRangeCalendar } from "@mui/x-date-pickers-pro";
import { Action, PickerDay } from "design";
import { Activity } from "gantt-models";
import { DateTime as dt } from "luxon";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Action as A, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";

export const ActivityPeriodCell = observer((props: GridRenderCellParams<Activity>) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);


    const handleChange = (dateRange: DateRange<dt>) => {

    }

    return (
        <>
            <Can I={A.Write} a={Subject.Workpackages} passThrough>
                {(allowed) => (
                    <Box
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        px={2}
                        onMouseOver={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <Typography
                            fontSize={12}
                            sx={{ color: props.row.Style.textColor }}
                            textAlign="center"
                            pr={
                                allowed &&
                                (isHovering ||
                                    open ||
                                    props.row.kind === "Delivery")
                                    ? 1
                                    : 0
                            }
                        >
                            {props.row.Interval.display.intervals.short}
                        </Typography>

                        {(isHovering || open) && props.row.kind === "Task" && allowed && (
                            <Action.Symbol
                                title="Vælg periode"
                                icon={faCalendar}
                                onClick={(event) =>
                                    setAnchorEl((prev) =>
                                        prev ? null : event.currentTarget
                                    )
                                }
                            />
                        )}
                    </Box>
                )}
            </Can>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        px: 1,
                    },
                }}
            >
                <Box>
                    <DateRangeCalendar<dt>
                        displayWeekNumber
                        value={[
                            props.row.Interval.dt.start,
                            props.row.Interval.dt.end,
                        ]}
                        onChange={handleChange}
                        slots={{ day: PickerDay }}
                        sx={{
                            "& .MuiDateRangeCalendar-monthContainer": {
                                px: 1,
                                textTransform: "capitalize",
                            },
                        }}
                    />
                </Box>
            </Menu>
        </>
    );
});
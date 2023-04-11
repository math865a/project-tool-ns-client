import { styled } from "@mui/material";
import { DateRangePickerDay, DateRangePickerDayProps } from "@mui/x-date-pickers-pro";
import { DateTime } from "luxon";

export const PickerDay = styled(DateRangePickerDay)(
    ({
      theme,
      isHighlighting,
      isStartOfHighlighting,
      isEndOfHighlighting,
      outsideCurrentMonth,
    }) => ({

      ...(!outsideCurrentMonth &&
        isHighlighting && {
          borderRadius: 0,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
      ...(isStartOfHighlighting && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        color: theme.palette.common.white,
      }),
      ...(isEndOfHighlighting && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        color: theme.palette.common.white,
      }),
    }),
  ) as React.ComponentType<DateRangePickerDayProps<DateTime>>;
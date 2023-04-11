import { faCalendar } from '@fortawesome/pro-light-svg-icons';
import { getDateTime } from '~/util';
import { Box, Menu, Slider, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { Action } from 'design';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTimeline } from '../task-timeline.provider';
const TimelineControls = observer(() => {

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <DateControl />
            <ZoomControl />
        </Stack>
    );
});

export default TimelineControls;

const ZoomControl = observer(() => {
    const Calendar = useTimeline().Calendar;

    return (
        <Box width={200}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography fontSize={12}>Zoom</Typography>
                <Slider
                    min={1}
                    max={50}
                    step={1}
                    size="small"
                    value={Calendar.dpx}
                    onChange={(_, value) => Calendar.setDpx(value as number)}
                />
            </Stack>
        </Box>
    );
});

const DateControl = observer(() => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const Calendar = useTimeline().Calendar;

    return (
        <>
            <Action.TextButton
                icon={faCalendar}
                text="Gå til dato"
                onClick={(event) =>
                    setAnchorEl((prev) => (prev ? null : event.currentTarget))
                }
            />
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                PaperProps={{ sx: { p: 1 } }}
            >
                <DatePicker
                    value={getDateTime(Calendar.tStart)}
                    onChange={(value) => {
                        if (value) {
                            const ts = value.toMillis();
                            Calendar.setTStart(ts);
                        }
                    }}
                />
            </Menu>
        </>
    );
});

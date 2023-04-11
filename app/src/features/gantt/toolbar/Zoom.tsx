import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons";
import { Box, Stack, Typography, Slider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { useGantt } from "useGantt";

export const TimelineZoom = observer(() => {
    const Gantt = useGantt();

    return (
        <Box width={200}>
            <Stack direction="row" alignItems="center" spacing={1}>
                {/* <Typography fontSize={12}>Zoom</Typography> */}
                <Action.Symbol
                    icon={faMinus}
                    title="Zoom ud"
                    onClick={() => Gantt.Timeline.zoom(-1)}
                    disabled={
                        Gantt.Timeline.dpxBounds.min === Gantt.Timeline.dpx
                    }
                />
                <Slider
                    min={Gantt.Timeline.dpxBounds.min}
                    size="small"
                    max={Gantt.Timeline.dpxBounds.max}
                    value={Gantt.Timeline.dpx}
                    onChange={(_, value) =>
                        Gantt.Timeline.handleZoom(value as number)
                    }
                />
                <Action.Symbol
                    icon={faPlus}
                    title="Zoom ind"
                    onClick={() => Gantt.Timeline.zoom(1)}
                    disabled={
                        Gantt.Timeline.dpxBounds.max === Gantt.Timeline.dpx
                    }
                />
            </Stack>
        </Box>
    );
});

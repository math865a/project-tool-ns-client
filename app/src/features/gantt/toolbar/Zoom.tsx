import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons";
import { Box, Stack, Typography, Slider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { useGantt } from "useGantt";

export const TimelineZoom = observer(() => {
    const {
        Timeline: { Zoom },
    } = useGantt();

    return (
        <Box width={200}>
            <Stack direction="row" alignItems="center" spacing={1}>
                {/* <Typography fontSize={12}>Zoom</Typography> */}
                <Action.Symbol
                    icon={faMinus}
                    title="Zoom ud"
                    onClick={() => Zoom.increment(-1)}
                    disabled={Zoom.min === Zoom.zoom}
                />
                <Slider
                    min={Zoom.min}
                    size="small"
                    max={Zoom.max}
                    value={Zoom.zoom}
                    onChange={(_, value) => Zoom.slide(value as number)}
                />
                <Action.Symbol
                    icon={faPlus}
                    title="Zoom ind"
                    onClick={() => Zoom.increment(1)}
                    disabled={Zoom.max === Zoom.zoom}
                />
            </Stack>
        </Box>
    );
});

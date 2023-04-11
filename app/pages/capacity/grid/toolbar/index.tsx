import { default as Views } from "./views";
import { default as ViewMode } from "./view-mode";
import { default as BookingStageFilter } from "./booking-stage-filter";
import { Box, Divider, Stack } from "@mui/material";
import { TOOLBAR_HEIGHT } from "../../_config/contants";

const CapacityBoardToolbar = () => {
    return (
        <Box display="flex" flexGrow={1} justifyContent="space-between" height={TOOLBAR_HEIGHT} alignItems="center" px={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <ViewMode />
                <Box height={TOOLBAR_HEIGHT/3} width={10} display="flex" justifyContent="flex-start">
                <Divider orientation="vertical"/>
                </Box>
           
                <BookingStageFilter />

            </Stack>
            <Views />
        </Box>
    );
};

export default CapacityBoardToolbar;

export { default as RowFilter } from "./row-filter";

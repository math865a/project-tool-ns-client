import { Box, Stack } from "@mui/material";
import { Title } from "./Title";
import { TimelineZoom } from "./Zoom";
import { Enclose } from "./Enclose";
import { TeamMenuAction } from "./TeamMenuAction";
import { Minimize } from "./Minimize";

export function GanttToolbar() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1}
        >
            <Title />

            <Stack direction="row" alignItems="center" spacing={3}>
                <TimelineZoom />
                <Enclose />
                <TeamMenuAction />
                <Box pl={3}>
                    <Minimize />
                </Box>
            </Stack>
        </Box>
    );
}

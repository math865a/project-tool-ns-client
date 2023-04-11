import { Box, DialogTitle, Stack } from "@mui/material";
import {
    TimelineZoom,
    Enclose,
    TeamMenuAction,
    Minimize,
    Title,
} from "./toolbar";

export function GanttToolbar() {
    return (
        <DialogTitle
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
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
        </DialogTitle>
    );
}

import { DialogActions, Stack } from "@mui/material";
import { PlanWork, PlanPeriod, PlanDays } from "../footer";

export function GanttFooter() {
    return (
        <DialogActions
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mx: 2,
                pt: 1.5,
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack direction="row" alignItems="center" spacing={4.5}>
                <PlanPeriod />
                <PlanDays />
                <PlanWork />
            </Stack>
        </DialogActions>
    );
}

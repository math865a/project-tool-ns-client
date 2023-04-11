import { Divider, Typography, Stack } from "@mui/material";
import { Page } from "~/src/design-system";
import { DateRangePicker } from "./DateRangePicker";

export function ResourceCapacityHeader() {
    return (
        <Page.Header >
            <Stack direction="row" alignItems="center" flexGrow={1} justifyContent="flex-start">
                <Typography>Viser data for perioden: </Typography>
                <DateRangePicker />
            </Stack>
        </Page.Header>
    );
}

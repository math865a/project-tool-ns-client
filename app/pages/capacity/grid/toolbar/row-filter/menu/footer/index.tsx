import {
    Box,
    Stack
} from "@mui/material";
import { observer } from "mobx-react-lite";
import ClearFilterAction from "./ClearFilterAction";
import FilterCount from "./FilterCount";
import NoBookingToggle from "./NoBookingsToggle";

export const RowFilterMenuFooter = observer(() => {

    return (
        <Box
            flexGrow={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={1}
        >
            <Stack direction="row" spacing={2.5} alignItems="center">
                <FilterCount />
                <NoBookingToggle />
            </Stack>
            <ClearFilterAction />
        </Box>
    );
});

export default RowFilterMenuFooter;

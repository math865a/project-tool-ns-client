import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useBoard } from "../../../_provider";
import { BookingStageChip } from "./BookingStageChip";

const BookingStageFilter = observer(() => {
    const BookingStageFilter = useBoard().Filter.BookingStageFilter;

    return (
        <Stack alignItems="center" direction="row" spacing={1}>
            {BookingStageFilter.bookingStageOptions.map((node) => (
                <BookingStageChip key={node.name} node={node} />
            ))}
        </Stack>
    );
});

export default BookingStageFilter;

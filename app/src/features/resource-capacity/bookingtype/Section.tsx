import { Page } from "~/src/design-system";
import { IDateRange } from "../_state/useDateRange";
import {BookingTypeChart} from "./Chart";
import BookingTypeLegends from "./Legends";

export function BookingTypeSection() {
    return (
        <Page.Section
            title="Bookingtype"
            xs={6}
            px={1}
            pxTitle={2}
            overflowX
            overflowY
            startActions={<BookingTypeLegends />}
        >
            <BookingTypeChart />
        </Page.Section>
    );
}

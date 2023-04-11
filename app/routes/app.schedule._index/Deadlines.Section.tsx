import { Page } from "~/src/design-system";
import { useSummary } from "./_state";
import { DeadlinesCarousel } from "./deadlines/Deadlines.Carousel";

export default function DeadlinesSection() {
    const {
        deadline: { title },
    } = useSummary();

    return (
        <Page.Section title="Deadlines" xs={12}>
            <DeadlinesCarousel />
        </Page.Section>
    );
}

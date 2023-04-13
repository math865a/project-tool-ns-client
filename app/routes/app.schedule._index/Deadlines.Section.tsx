import { Fallback, Page } from "~/src/design-system";
import { useSummary } from "./_state";
import { DeadlinesCarousel } from "./deadlines/Deadlines.Carousel";

export default function DeadlinesSection() {
    const {
        deadline: { title, deadlines },
    } = useSummary();

    return (
        <Page.Section title="Deadlines" xs={12}>
            {deadlines.length === 0 ? (
                <Fallback.Empty text="Du har ingen deadlines inden for de næste 14 dage" />
            ) : (
                <DeadlinesCarousel />
            )}
        </Page.Section>
    );
}

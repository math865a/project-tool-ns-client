import { Details, Page } from "~/src/design-system";
import { ResourceTypes, Tags } from "./relations";

export default function RelationSection() {
    return (
        <Page.Section title="Relationer" xs={4} alignSelf="stretch">
            <Details.Container spacing={2}>
                <Tags />
                <ResourceTypes />
            </Details.Container>
        </Page.Section>
    );
}

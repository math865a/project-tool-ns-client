import StageChips from "~/src/components/stage-chips/StageChips";
import { Details, Page } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action, Subject } from "~/src/_definitions";
import { useWorkpackage } from "~/src/state";


export default function StatusSection() {
    const { stage, bookingStage } = useWorkpackage();

    return (
        <Page.Section title="Status" xs={4} alignSelf="stretch">
            <Can I={Action.Write} a={Subject.Workpackages} passThrough>
                {(allowed) => (
                    <Details.Container>
                        <Details.Item
                            title="Stadie"
                            value={<StageChips {...stage} disabled={!allowed} />}
                        />
                        <Details.Item
                            title="Bookingstadie"
                            value={<StageChips {...bookingStage} disabled={!allowed}/>}
                        />
                    </Details.Container>
                )}
            </Can>
        </Page.Section>
    );
}

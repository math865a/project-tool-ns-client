import { DateTime as dt } from "luxon";
import { useSession } from "~/src";
import { Page } from "~/src/design-system";
import { Tasks } from "~/src/features";
const rowHeight = 50;
export default function TasksSection() {
    function getMonday() {
        const today = dt.now();
        return today.minus({ days: today.weekday - 1 });
    }

    function getPeriod() {
        const start = getMonday();
        return {
            start: start,
            end: start.plus({ weeks: 2 }),
        };
    }

    const {
        user: { uid },
    } = useSession();
    return (
        <Page.Section title="Relevante opgaver" xs={12}>
            <div style={{ width: "100%" }}>
                <div style={{width: "100%", height: 500}}>
                    <Tasks resourceId={uid} initialPeriod={getPeriod()} hideDatePicker />
                </div>
            </div>
        </Page.Section>
    );
}

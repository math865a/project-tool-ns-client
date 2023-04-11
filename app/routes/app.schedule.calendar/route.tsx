import { useSession } from "~/src";
import { Calendar } from "~/src/features";

export default function CalendarPage() {
    const {
        user: { uid },
    } = useSession();

    return <Calendar resourceId={uid} />;
}

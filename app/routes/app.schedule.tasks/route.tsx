import { useSession } from "~/src";
import { Tasks } from "~/src/features";

export default function TasksPage() {
    const {
        user: { uid },
    } = useSession();

    return <Tasks resourceId={uid} />;
}

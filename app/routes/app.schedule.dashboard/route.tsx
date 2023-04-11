import { useSession } from "~/src";
import { ResourceCapacity } from "~/src/features/resource-capacity";

export default function DashboardPage() {
    const {
        user: { uid },
    } = useSession();

    return <ResourceCapacity resourceId={uid} />;
}

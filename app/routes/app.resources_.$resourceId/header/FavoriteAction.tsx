import { useRouteLoaderData } from "@remix-run/react";
import { FavoriteToggle, ResourceProfile, useSession } from "~/src";

export function FavoriteAction() {
    const {
        favorites: { addResourceFavorite },
    } = useSession();
    const data = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;

    const onAdd = () => {
        addResourceFavorite(data);
    };

    return <FavoriteToggle recordId={data.node.id} onAdd={onAdd} />;
}

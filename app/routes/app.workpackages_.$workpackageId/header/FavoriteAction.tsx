import { useLoaderData } from "@remix-run/react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId._index/route";
import { FavoriteToggle, useSession } from "~/src";

export function FavoriteAction() {
    const {
        favorites: { addWorkpackageFavorite },
    } = useSession();
    const data = useLoaderData<WorkpackageLoader>();

    const onAdd = () => {
        addWorkpackageFavorite(data);
    };

    return <FavoriteToggle recordId={data.node.id} onAdd={onAdd} />;
}

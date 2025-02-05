import { Action } from "design";
import { useSession } from "../../SessionContextProvider";
import FavoritesMenu from "./FavoriteMenu";
import { IconStar } from "@tabler/icons-react";

export function Favorites() {
    const {
        favorites: { handleOpen },
    } = useSession();

    return (
        <>
            <Action.TextButton
                icon={IconStar}
                iconSize={0.9}
                ptText={0.25}
                text="Favoritter"
                onClick={handleOpen}
            />
            <FavoritesMenu />
        </>
    );
}

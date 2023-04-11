import { Action } from "design";
import { useSession } from "../../SessionContextProvider";
import FavoritesMenu from "./FavoriteMenu";
import { faStar } from "@fortawesome/pro-light-svg-icons";

export function Favorites() {
    const {
        favorites: { handleOpen },
    } = useSession();

    return (
        <>
            <Action.TextButton
                icon={faStar}
                iconSize={0.9}
                ptText={0.25}
                text="Favoritter"
                onClick={handleOpen}
            />
            <FavoritesMenu />
        </>
    );
}

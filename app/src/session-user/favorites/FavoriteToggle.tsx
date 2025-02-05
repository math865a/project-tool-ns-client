import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Action } from "design";
import { useSession } from "../SessionContextProvider";
import { useMemo } from "react";

export function FavoriteToggle({
    onAdd,
    recordId,
}: {
    onAdd: () => void;
    recordId: string;
}) {
    const {
        favorites: { favorites, removeFavorite },
    } = useSession();

    const isFavorite = useMemo(() => {
        return favorites.find((d) => d.id === recordId) !== undefined;
    }, [recordId, favorites]);

    const handleClick = () => {
        if (isFavorite) {
            removeFavorite(recordId);
        } else {
            onAdd();
        }
    };

    return (
        <Action.TextButton
            text={isFavorite ? "Favorit" : "Tilføj som favorit"}
            iconSize={0.9}
            ptText={0.25}
            icon={isFavorite ? IconStarFilled : IconStar}
            onClick={handleClick}
            symbolProps={{
                color: isFavorite ? "#F2CB40" : undefined,
            }}
        />
    );
}

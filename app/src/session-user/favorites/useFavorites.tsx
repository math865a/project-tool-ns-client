import _ from "lodash";
import { useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import {
    Favorite,
    ResourceProfile,
    WorkpackageProfile,
} from "~/src/_definitions";
import { useMenuState } from "~/src/hooks/useMenu";

export const useFavorites = (initialFavorites: Favorite[], socket?: Socket) => {
    const [favorites, setFavorites] = useState<Favorite[]>(initialFavorites);

    const groupedFavorites = useGroupedFavorites(favorites);

    const removeFavorite = (recordId: string) => {
        setFavorites((prev) => prev.filter((d) => d.id !== recordId));
        socket?.emit("remove:favorite", recordId);
    };

    const addWorkpackageFavorite = (data: WorkpackageProfile) => {
        setFavorites((prev) => [
            ...prev,
            {
                id: data.node.id,
                name: data.node.systematicName,
                type: "Arbejdspakker",
            },
        ]);
        addFavorite(data.node.id);
    };

    const addResourceFavorite = (data: ResourceProfile) => {
        setFavorites((prev) => [
            ...prev,
            {
                id: data.node.id,
                name: data.node.name,
                type: "Ressourcer",
                color: data.node.color,
            },
        ]);
        addFavorite(data.node.id);
    };

    const addFavorite = (recordId: string) => {
        socket?.emit("add:favorite", recordId);
    };

    const isEmpty = useMemo(() => favorites.length === 0, [favorites]);

    const menuProps = useMenuState();

    return {
        favorites,
        groupedFavorites,
        removeFavorite,
        addWorkpackageFavorite,
        addResourceFavorite,
        isEmpty,
        ...menuProps,
    };
};

const useGroupedFavorites = (favorites: Favorite[]) => {
    const resourceFavorites = useMemo(
        () => _.filter(favorites, (d) => d.type === "Ressourcer"),
        [favorites]
    );
    const workpackageFavorites = useMemo(
        () => _.filter(favorites, (d) => d.type === "Arbejdspakker"),
        [favorites]
    );
    return {
        resourceFavorites,
        workpackageFavorites,
    };
};

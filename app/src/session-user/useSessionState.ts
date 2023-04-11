import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/app/route";
import { useAbilities } from "./abilities";
import { useFavorites } from "./favorites";
import { useFeedback } from "./feedback";
import { usePresence } from "./presence";
import { useSocket } from "~/src";
import { useSocketEvents } from "./useSocketEvents";

export const useSessionState = () => {
    const data = useLoaderData<typeof loader>();

    const socket = useSocket({namespace: "userService", token: data.token, uid: data.user.uid})

    const presence = usePresence(data.onlineUsers);
    const abilities = useAbilities(data.rawAbilities, socket);
    const feedback = useFeedback(socket);
    const favorites = useFavorites(data.favorites, socket);
    useSocketEvents(socket);

    return {
        abilities,
        presence,
        feedback,
        favorites,
        user: data.user,
        token: data.token,
    };
};

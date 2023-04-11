import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { UserData } from "~/src/_definitions";

export const usePresence = (initialOnlineUsers: UserData[]) => {
    const [onlineUsers, setOnlineUsers] =
        useState<UserData[]>(initialOnlineUsers);

    const addPresences = (users: UserData[]) => {
        console.log("addPresences", users);
        setOnlineUsers((prev) => [...prev, ...users]);
    };

    const addPresence = (user: UserData) => {
        console.log("addPresence", user);
        setOnlineUsers((prev) => [...prev, user]);
    };

    const removePresence = (uid: string) => {
        console.log("removePresence", uid);
        setOnlineUsers((prev) => prev.filter((user) => user.uid !== uid));
    };
/*
    useEffect(() => {
        socket.on("presence:join", addPresence);
        socket.on("presence:leave", removePresence);
        socket.on("presence:initial", addPresences);

        return () => {
            socket.off("presence:join", addPresence);
            socket.off("presence:leave", removePresence);
            socket.off("presence:initial", addPresences);
        };
    }, []);*/

    return onlineUsers;
};

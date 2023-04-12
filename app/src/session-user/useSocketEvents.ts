import { useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useSocketEvents = (socket?: Socket) => {
    const submit = useSubmit();

    useEffect(() => {
        socket?.on("user-deactivated", () => {
            submit({}, { action: "/app/session", method: "POST", replace: true });
        });
    }, [socket]);
};

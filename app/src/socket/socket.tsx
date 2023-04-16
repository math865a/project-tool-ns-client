import { Child } from "design";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useNamespaces } from "../hooks/useNamespaces";
import { useSession } from "../session-user";

export const useSocket = ({
    namespace,
    token,
    uid,
}: {
    namespace: keyof ReturnType<typeof useNamespaces>;
    token: string;
    uid: string;
}) => {
    const namespaces = useNamespaces();

    const [socket, setSocket] = useState<Socket | undefined>();

    useEffect(() => {
        const socket = io(namespaces[namespace], {
            auth: {
                access_token: token ?? "",
                uid: uid,
            }
        });
        setSocket(socket);
        return () => {
            socket.close();
        };
    }, [token, uid]);

    return socket;
};

const SocketContext = createContext<Socket | undefined>(undefined);

export function SocketProvider({
    namespace,
    children,
}: {
    namespace: keyof ReturnType<typeof useNamespaces>;
    children?: Child | Child[];
}) {
    const { user, token } = useSession();

    const socket = useSocket({ namespace, token, uid: user.uid });
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocketContext = () => {
    const ctx = useContext(SocketContext);
    return ctx;
};

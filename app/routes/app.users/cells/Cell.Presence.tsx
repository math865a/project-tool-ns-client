import { Box, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useSession } from "~/src/session-user";

export function PresenceCell({ uid }: { uid: string }) {
    const { presence, user } = useSession();

    const isOnline = useMemo(() => {
        return presence.some((user) => user.uid === uid) || uid === user.uid ;
    }, [uid, presence]);

    return (
        <Tooltip title={isOnline ? "Online" : "Offline"}>
            <Box
                width={10}
                height={10}
                borderRadius="50%"
                sx={{
                    backgroundColor: (theme) =>
                        isOnline
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                }}
            />
        </Tooltip>
    );
}

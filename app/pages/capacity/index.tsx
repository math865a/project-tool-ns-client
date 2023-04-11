import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ClientOnly } from "remix-utils";
import { Page } from "~/src/design-system";
import CapacityBoardGrid from "./grid";
import DragProvider from "./grid/DragProvider";
import { useData } from "./hooks";
import CapacityBoardProvider from "./_provider";
import { useSession, useSocket } from "~/src";

const CapacityBoard = observer(() => {
    const { rows, bookingStages, views } = useData();
    const session = useSession()
    const socket = useSocket({namespace: "capacityBoard", token: session.token, uid: session.user.uid});

    if (!socket) {
        return null;
    }

    return (
        <ClientOnly>
            {() => (
                <CapacityBoardProvider
                    rows={rows}
                    bookingStages={bookingStages}
                    views={views}
                    socket={socket}
                >
                    {(api) => (
                        <Page.SubLayout>
                            <DragProvider>
                                <Box minHeight="85vh" height="85vh" maxHeight="85vh" flexGrow={1} pt={1}>
                                    <CapacityBoardGrid api={api} />
                                </Box>
                            </DragProvider>
                        </Page.SubLayout>
                    )}
                </CapacityBoardProvider>
            )}
        </ClientOnly>
    );
});

export default CapacityBoard;

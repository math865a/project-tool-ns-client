import { Socket } from "socket.io-client";
import { useSocketContext } from "~/src/socket";
import ProjectManagerDisplay from "./ProjectManagerDisplay";
import ProjectManagerMenu from "./ProjectManagerMenu";
import ProjectManagerMenuProvider from "./ProjectManagerMenuProvider";
import { ProjectManager } from "~/src";

interface Props {
    initialProjectManager: ProjectManager;
    socketMessage: string;
    title?: string;
    socket?: Socket;
    pl?: number;
    displayMinWidth?: number;
    disabled?: boolean;
}

export default function ProjectManagerRoot({
    initialProjectManager,
    socketMessage,
    title,
    socket,
    pl = 0,
    displayMinWidth = 0,
    disabled,
}: Props) {
    const socketContext = useSocketContext();

    return (
        <>
            <ProjectManagerMenuProvider
                title={title}
                socketMessage={socketMessage}
                initialProjectManager={initialProjectManager}
                socket={socket ?? socketContext}
            >
                <ProjectManagerDisplay
                    pl={pl}
                    displayMinWidth={displayMinWidth}
                    disabled={disabled}
                />
                <ProjectManagerMenu />
            </ProjectManagerMenuProvider>
        </>
    );
}

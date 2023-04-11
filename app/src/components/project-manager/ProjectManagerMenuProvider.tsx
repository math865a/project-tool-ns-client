import { ProjectManager } from "@math865a/project-tool.types";
import { Child } from "design";
import { createContext, useContext, useMemo } from "react";
import { Socket } from "socket.io-client";
import { useProjectManager } from "./hooks/useProjectManager";
import { useProjectManagerMenuState } from "./hooks/useProjectManagerMenuState";

interface IProjectManagerMenuBag {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleOpen: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    handleClose: () => void;
    options: ProjectManager[];
    isLoadingOptions: boolean;
    rawOptions: ProjectManager[];
    projectManager: ProjectManager;
    updateProjectManager: (projectManager: ProjectManager | null) => void;
    title: string;
}

const ProjectManagerMenuContext = createContext<
    IProjectManagerMenuBag | undefined
>(undefined);

export default function ProjectManagerMenuProvider({
    socket,
    initialProjectManager,
    title = "Projektleder",
    socketMessage,
    children,
}: {
    socket?: Socket;
    initialProjectManager: ProjectManager;
    title?: string;
    socketMessage: string;
    children: Child | Child[];
}) {

    const props1: Omit<
        IProjectManagerMenuBag,
        "projectManager" | "updateProjectManager" | "title"
    > = useProjectManagerMenuState(socket);
    const props2: Pick<
        IProjectManagerMenuBag,
        "projectManager" | "updateProjectManager"
    > = useProjectManager(initialProjectManager, socketMessage, props1.rawOptions, socket);
    return (
        <ProjectManagerMenuContext.Provider value={{ ...props1, ...props2, title: title }}>
            {children}
        </ProjectManagerMenuContext.Provider>
    );
}

export const useProjectManagerMenu = () => {
    const ctx = useContext(ProjectManagerMenuContext);
    if (!ctx) {
        throw new Error("no context");
    }
    return ctx;
};

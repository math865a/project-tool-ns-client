import {
    ProjectManager,
    UpdateProjectManagerDto
} from "@math865a/project-tool.types";
import { useParams } from "@remix-run/react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import invariant from "tiny-invariant";
import { useProjectManagerMenu } from "../ProjectManagerMenuProvider";

export const useProjectManager = (

    initialManager: ProjectManager,
    socketMessage: string,
    rawOptions: ProjectManager[],
    socket?: Socket,
) => {
    const { workpackageId } = useParams();
    invariant(workpackageId);

    const [projectManager, setProjectManager] =
        useState<ProjectManager>(initialManager);

    const persistProjectManager = (projectManagerId: string) => {
        const dto: UpdateProjectManagerDto = {
            workpackageId: workpackageId,
            projectManagerId: projectManagerId,
        };
        socket?.emit(socketMessage, dto);
    };

    const updateProjectManager = (pm: ProjectManager | null) => {
        if (pm === null || pm.id === projectManager.id) {
            if (!rawOptions) return;
            const defaultProjectManager = rawOptions.find(
                (d) => d.name === "Ingen"
            );
            if (!defaultProjectManager) return;
            setProjectManager(defaultProjectManager);
            persistProjectManager(defaultProjectManager.id);
        } else {
            setProjectManager(pm);
            persistProjectManager(pm.id);
        }
    };

    return {
        projectManager,
        updateProjectManager,
    };
};

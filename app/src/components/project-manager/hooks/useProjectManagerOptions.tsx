import { ProjectManager } from "@math865a/project-tool.types";
import _ from "lodash";
import { useState } from "react";
import { Socket } from "socket.io-client";

export const useProjectManagerOptions = (socket?: Socket) => {
    const [rawOptions, setRawOptions] = useState<ProjectManager[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    const updateOptions = (newOptions: ProjectManager[]) => {
        setIsLoadingOptions(false);
        setHasLoaded(true);
        setRawOptions(newOptions);
    };

    const loadOptions = () => {
        setIsLoadingOptions(true);
        setHasLoaded(false);
        socket?.emit("project-manager-options", {}, updateOptions);
    };

    const clearOptions = () => {
        setRawOptions([]);
        setIsLoadingOptions(false);
        setHasLoaded(false);
    };



    const getOptions = (rawOptions: ProjectManager[]) => {
        const newOptions = _.cloneDeep(rawOptions);
        const defaultProjectManager = newOptions.splice(_.findIndex(newOptions, d => d.name === "Ingen"), 1);
        const newOp = [defaultProjectManager[0], ...newOptions];
        return newOp;
    };

    return {
        loadOptions,
        rawOptions,
        options: rawOptions,
        isLoadingOptions,
        hasLoaded,
        clearOptions,
    };
};

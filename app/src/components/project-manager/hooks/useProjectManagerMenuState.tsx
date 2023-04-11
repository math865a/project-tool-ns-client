import { useState } from "react";
import { Socket } from "socket.io-client";
import { useProjectManagerOptions } from "./useProjectManagerOptions";

export const useProjectManagerMenuState = (socket?: Socket) => {
    const {
        loadOptions, options, isLoadingOptions, hasLoaded, rawOptions, clearOptions,
    } = useProjectManagerOptions(socket);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!anchorEl) {
            loadOptions();
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        clearOptions();
    };

    return {
        anchorEl,
        open,
        rawOptions,
        handleOpen,
        handleClose,
        options,
        isLoadingOptions,
    };
};

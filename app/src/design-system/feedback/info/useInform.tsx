import { AlertColor } from "@mui/material";
import { useState } from "react";


export const useInform = () => {
    const [props, setProps] = useState<{ open: boolean; message?: string,   type: AlertColor }>({
        open: false,
        message: undefined,
        type: "info"
    });

    const inform = (message?: string, type: AlertColor = "info") => {
        if (message) {
            setProps({ open: true, message, type: type });
        }
    };

    const closeSnackbar = (reason: string) => {
        if (reason === "clickaway") return;
        setProps({ open: false, message: undefined, type: "info" });
    };
    return {
        informProps: {
            open: props.open,
            message: props.message,
            onClose: closeSnackbar,
            type: props.type
        },
        inform,
    };
};

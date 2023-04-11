import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Alert, AlertColor, Snackbar, Typography, Portal, Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Action, Child } from "~/src/design-system";

export interface IInfoProps {
    message?: string;
    type: AlertColor;
    onClose: (reason: string) => void;
    open: boolean;
    action?: Child | Child[];
    autoHideDuration?: number;
    maxWidth?: number;
}

export default function Info({
    message,
    type,
    onClose,
    open,
    action,
    autoHideDuration = 6000,
    maxWidth = 600,
}: IInfoProps) {
    const handleClose = (reason: string) => {
        onClose(reason);
    };

    const ActionComponent = useMemo(() => {
        return (
            <>
                <Action.Symbol
                    icon={faTimes}
                    onClick={() => handleClose("action")}
                    title="luk"
                />
                {action}
            </>
        );
    }, [action, handleClose]);
const theme = useTheme();
    const backgroundColor = useMemo(() => {
        switch (type){
            case "error":
                return theme.palette.error.main;
            case "warning":
                return theme.palette.warning.main;
            case "info":
                return theme.palette.info.main;
            case "success":
                return theme.palette.success.main;
            default:
                return undefined
        }
    },[type])

    return (
        <>
            <Portal>
                <Snackbar
                ContentProps={{sx:{fontSize: 12, backgroundColor: backgroundColor}}}
                    open={open}
                    message={message}
                    onClose={(e, reason) => handleClose(reason)}
                    autoHideDuration={autoHideDuration}
                
                    action={<Action.Symbol
                        icon={faTimes}
                        onClick={() => handleClose("action")}
                        title="luk"
                        sx={{color: "#fff"}}
                    />}
                        
                />
            </Portal>
        </>
    );
}

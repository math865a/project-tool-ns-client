import {
    Button,
    IconButton,
    Portal,
    Snackbar as SB,
    SnackbarProps,
    Tooltip,
    tooltipClasses,
    TooltipProps,
    Typography,
} from "@mui/material";
import { Dialog } from "../dialog";
import { Symbol } from "../symbol";
import { Inform, useInform } from "./info";
import { IconInfoCircle } from "@tabler/icons-react";

interface ISnackbarProps extends SnackbarProps {}

function Snackbar({ autoHideDuration = 4000, ...rest }: SnackbarProps) {
    if (typeof window === "undefined") return null;
    return (
        <Portal container={document.body}>
            <SB autoHideDuration={autoHideDuration} {...rest} />
        </Portal>
    );
}

export interface IConfirmationMenuProps {
    title?: string;
    text?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    onClose: () => void;
    open: boolean;
}

function ConfirmationMenu({
    title = "Vil du slette dette element?",
    text = "Relateret data som f.eks. bookinger og opgaver vil også blive slettet. Der er ingen mulighed for genskabelse, så venligst vær sikker.",
    onConfirm,
    onClose,
    onCancel = onClose,
    open,
}: IConfirmationMenuProps) {
    return (
        <Dialog.Modal open={open} onClose={onClose}>
            <Dialog.Title title={title} />
            <Dialog.Body>
                <Typography>{text}</Typography>
            </Dialog.Body>
            <Dialog.Footer>
                <Button onClick={onCancel} variant="outlined">
                    Annuller
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary">
                    Bekræft
                </Button>
            </Dialog.Footer>
        </Dialog.Modal>
    );
}

export interface IInfoTooltipProps {
    text: string;
    placement?: TooltipProps["placement"];
}

function InfoTooltip({ text, placement = "top" }: IInfoTooltipProps) {
    return (
        <Tooltip
            title={text}
            arrow
            placement={placement}
            sx={{
                [`& .${tooltipClasses.tooltip}`]: {
                    maxWidth: 400,
                },
            }}
        >
            <IconButton
                size="small"
                disableFocusRipple
                disableTouchRipple
                sx={{ cursor: "default" }}
            >
                <Symbol icon={IconInfoCircle} size={0.9} />
            </IconButton>
        </Tooltip>
    );
}

export const Feedback = {
    Snackbar,
    ConfirmationMenu,
    useInform: useInform,
    Inform: Inform,
    InfoTooltip,
};

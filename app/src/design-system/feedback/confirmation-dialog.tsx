import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { Action } from "../action";
import { Child } from "../types";

export interface IConfirmationDialogProps {
    open: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    title?: string;
    subtitle?: string
    text?: string;
    body?: Child | Child[];
    actions?: Child | Child[];
    hideDefaultActions?: boolean;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "xxl";
    cancelText?: string;
    confirmText?: string;
    cancelVariant?: "contained" | "outlined" | "text";
    confirmVariant?: "contained" | "outlined" | "text";
    fullWidth?: boolean;
}

export function ConfirmationDialog({
    open,
    hideDefaultActions = false,
    actions,
    onConfirm,
    onCancel,
    body,
    title = "Er du sikker?",
    text = "Denne handling kan ikke fortrydes. Venligst vær sikker.",
    maxWidth = "sm",
    cancelText = "Fortryd",
    confirmText = "Bekræft",
    cancelVariant = "outlined",
    confirmVariant = "contained",
    fullWidth
}: IConfirmationDialogProps) {
    const theme = useTheme()

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            PaperProps={{ sx: { borderRadius: 4, backgroundColor: "#fff" } }}
        >
            <DialogTitle>
                <Typography fontSize={14} fontWeight="bold">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {body ? body : <Typography fontSize={13}>{text}</Typography>}
            </DialogContent>
            <DialogActions>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    px={1.5}
                >
                    {!hideDefaultActions && (
                        <Action.TextButton
                            text={cancelText}
                            onClick={onCancel}
                            icon={faTimes}
                            symbolProps={{color: theme.palette.error.main}}
                        />
                    )}

                    {actions}
                    {!hideDefaultActions && (
                        <Action.TextButton
                            text={confirmText}
                            onClick={onConfirm}
                            icon={faCheck}
                            symbolProps={{color: theme.palette.success.main}}
                        />
                    )}
                </Stack>
            </DialogActions>
        </Dialog>
    );
}

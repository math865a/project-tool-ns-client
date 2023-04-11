import { faTimes } from "@fortawesome/pro-light-svg-icons";
import {
    Box,
    Breakpoint,
    Dialog as MuiDialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogProps,
    DialogTitle,
    Stack,
    Typography,
    TypographyProps,
} from "@mui/material";

import { Action, Child, IconDef, Symbol, SymbolProps } from "../index";

export interface IDialogProps {
    children?: Child | Child[];
    open: boolean;
    onClose?: () => void;
    maxWidth?: Breakpoint;
    scroll?: "paper" | "body";
    hideCloseAction?: boolean;
    disableCloseOnClickAway?: boolean
}

function Modal({
    children,
    open,
    maxWidth = "sm",
    onClose,
    scroll = "body",
    hideCloseAction = false,
    disableCloseOnClickAway = false,
}: IDialogProps) {
    return (
        <MuiDialog
            open={open}
            onClose={disableCloseOnClickAway ? undefined : onClose}
            fullWidth
            maxWidth={maxWidth}
            scroll={scroll}
            PaperProps={{ sx: { backgroundColor: "#fff", borderRadius: 4 } }}
        >
            <Box position="absolute" right={15} top={15} minWidth={25}>
                {!hideCloseAction && onClose && (
                    <Action.Symbol
                        iconSize={1.1}
                        icon={faTimes}
                        title="Luk"
                        onClick={onClose}
                    />
                )}
            </Box>
            <Box flexGrow={1} p={1}>
                {children}
            </Box>
        </MuiDialog>
    );
}

export interface IDialogTitleProps extends TypographyProps {
    title: string;
    icon?: IconDef;
    iconSize?: number;
    iconColor?: string;
    symbolProps?: Omit<SymbolProps, "icon" | "iconSize" | "iconColor">;
    subtitle?: string;
    subtitleFontSize?: number;
    subtitleColor?: string;
    actions?: Child | Child;
}

function Title({
    title,
    icon,
    iconSize = 1.3,
    iconColor,
    symbolProps,
    subtitle,
    subtitleFontSize = 13,
    subtitleColor = "text.secondary",
    actions,
    ...titleProps
}: IDialogTitleProps) {
    return (
        <DialogTitle
            sx={{ display: "flex", pb: 4, justifyContent: "space-between" }}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                {icon && (
                    <Symbol
                        icon={icon}
                        size={iconSize}
                        color={iconColor}
                        {...symbolProps}
                    />
                )}
                <Stack spacing={0.5} pr={2}>
                    <Typography fontWeight={600} fontSize={16} {...titleProps}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography
                            fontSize={subtitleFontSize}
                            color={subtitleColor}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Stack>
            </Stack>
            <Box>{actions}</Box>
        </DialogTitle>
    );
}

function Body({
    children,
    ...rest
}: DialogContentProps & { children?: Child | Child[] }) {
    return <DialogContent {...rest}>{children}</DialogContent>;
}

function Footer({
    children,
    ...rest
}: DialogActionsProps & { children?: Child | Child[] }) {
    return (
        <DialogActions
            sx={{ flexGrow: 1, pt: 2, justifyContent: "flex-end" }}
            {...rest}
        >
            <Stack direction="row" spacing={2}>
                {children}
            </Stack>
        </DialogActions>
    );
}

export const Dialog = {
    Modal,
    Title,
    Body,
    Footer,
};

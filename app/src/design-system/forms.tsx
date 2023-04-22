import {
    Box,
    Button,
    FormControl,
    FormLabel,
    InputAdornment,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Child } from "./types";
import { Action } from "./action";
import { IconDef } from "./symbol";
import { Fallback } from "./fallback";
import { useNavigation, useTransition } from "@remix-run/react";
import { formSubmit, UseSocketSubmitProps } from "~/src/hooks/useFormSubmit";
import { Inform, useInform } from "./feedback/info";
import { Feedback } from "./feedback";
import { useEffect } from "react";

export interface IFormLabelProps {
    label: string;
    widthFrac?: number;
    children?: Child | Child[];
    fullWidth?: boolean;
    pt?: number;
    errorText?: string;
    required?: boolean;
    direction?: "row" | "column";
}

function Wrapper({
    children,
    title,
}: {
    children?: Child | Child[];
    title: string;
}) {
    return (
        <Box
            component={Paper}
            variant="outlined"
            p={3}
            sx={{ borderRadius: 4 }}
        >
            <Typography fontSize={16} fontWeight={700} textAlign="left" pb={5}>
                {title}
            </Typography>
            <Box px={3} flexGrow={1}>
                {children}
            </Box>
        </Box>
    );
}

function VStack({
    children,
    spacing = 4,
    justifyContent = "flex-start",
}: {
    children?: Child | Child[];
    spacing?: number;
    justifyContent?: "center" | "flex-start";
}) {
    return (
        <Stack spacing={spacing} flexGrow={1} justifyContent={justifyContent}>
            {children}
        </Stack>
    );
}

function HStack({ children }: { children?: Child | Child[] }) {
    return (
        <Stack direction="row" spacing={3} flexGrow={1}>
            {children}
        </Stack>
    );
}

function AStack({ children }: { children?: Child | Child }) {
    return (
        <Stack
            direction="row"
            spacing={3}
            sx={{ flexGrow: 1 }}
            justifyContent="flex-end"
        >
            {children}
        </Stack>
    );
}

function Label({
    label,
    children,
    widthFrac = 1,
    fullWidth = false,
    pt = 3,
    errorText,
    required,
    direction = "column",
}: IFormLabelProps) {
    return (
        <Box
            sx={{
                width: fullWidth ? undefined : 250 * widthFrac,
                flexGrow: fullWidth ? 1 : 0,
            }}
        >
            <FormControl
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: direction,
                    alignItems: direction === "row" ? "center" : undefined,
                }}
            >
                {label && (
                    <FormLabel>
                        <Stack
                            pr={direction === "row" ? 2 : 0}
                            direction="row"
                            spacing={0.5}
                            alignItems={
                                direction === "row" ? "center" : "flex-start"
                            }
                        >
                            <Typography fontWeight={550} gutterBottom>
                                {label}
                            </Typography>
                            {required && (
                                <Typography color="error">*</Typography>
                            )}
                        </Stack>
                    </FormLabel>
                )}
                {children}
            </FormControl>
            {errorText && (
                <Typography color="error" fontSize={12} pt={0.5}>
                    {errorText}
                </Typography>
            )}
        </Box>
    );
}

function TextAdornment({ text }: { text: string }) {
    return (
        <InputAdornment position="end">
            <Typography fontSize={10} mb={-0.5}>
                {text}
            </Typography>
        </InputAdornment>
    );
}

export interface IFormActionProps {
    onSubmit?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    cancelIcon?: IconDef;
    confirmIcon?: IconDef;
    edge?: "start" | "end";
    loadingText?: string;
    confirmDisabled?: boolean;
    cancelDisabled?: boolean;
    hideOnNotDirty?: boolean;
    hideCancel?: boolean;
    hideConfirm?: boolean;
    confirmColor?:
        | "success"
        | "info"
        | "warning"
        | "error"
        | "inherit"
        | "primary"
        | "secondary"
        | undefined;
    cancelColor?:
        | "success"
        | "info"
        | "warning"
        | "error"
        | "inherit"
        | "primary"
        | "secondary"
        | undefined;
}

function Actions({
    edge = "end",
    onSubmit,
    onCancel,
    cancelIcon = faTimes,
    confirmIcon = faCheck,
    confirmText = "Opret",
    cancelText = "Annuller",
    loadingText,
    cancelDisabled,
    confirmDisabled,
    hideOnNotDirty,
    hideCancel,
    hideConfirm,
    confirmColor = "success",
    cancelColor = "error",
}: IFormActionProps) {
    const {
        reset,
        formState: { isDirty },
    } = useFormContext();

    const transition = useNavigation();
    const isSubmitting = transition.state !== "idle";
    const handleCancel = () => {
        reset();
        onCancel && onCancel();
    };

    return (
        <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            mt={1}
            justifyContent={edge === "end" ? "flex-end" : "flex-start"}
        >
            {hideOnNotDirty && !isDirty ? null : (
                <Stack
                    spacing={2}
                    direction={edge === "end" ? "row" : "row-reverse"}
                >
                    {!hideCancel && (
                        <Action.TextButton
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting || cancelDisabled}
                            text={cancelText}
                            icon={cancelIcon}
                            color={cancelColor}
                        />
                    )}
                    {!hideConfirm && (
                        <Action.TextButton
                            type="submit"
                            onClick={onSubmit}
                            disabled={isSubmitting || confirmDisabled}
                            text={confirmText}
                            icon={confirmIcon}
                            color={confirmColor}
                        />
                    )}
                </Stack>
            )}
        </Box>
    );
}

type SocketSubmitProps<
    T extends FieldValues = FieldValues,
    O extends FieldValues = T,
    C extends any = any
> = Pick<
    IFormActionProps,
    "edge" | "cancelIcon" | "cancelText" | "confirmIcon" | "confirmText"
> &
    Omit<
        IFormActionProps,
        | "onSubmit"
        | "onCancel"
        | "isSubmitting"
        | "edge"
        | "loadingText"
        | "confirmDisabled"
    > &
    UseSocketSubmitProps<T, O, C> & {
        message: string;
        transform?: (values: T) => any;
        callback?: (data: C) => any;
        disableHideOnNotDirty?: boolean;
    };

function SocketActions<
    T extends FieldValues = FieldValues,
    O extends FieldValues = T,
    C extends any = any
>({
    message,
    afterSubmit,
    transform,
    callback,
    cancelIcon = faTimes,
    confirmIcon = faCheck,
    confirmText = "Gem ændringer",
    cancelText = "Fortryd",
    disableHideOnNotDirty = false,
}: Omit<SocketSubmitProps<T, O, C>, "inform">) {
    const {
        reset,
        handleSubmit,
        formState: { isDirty },
    } = useFormContext<T>();

    const { inform, informProps } = Feedback.useInform();

    const onSubmit = formSubmit.useSocketSubmit<T, O, C>({
        message,
        transform,
        callback,
        afterSubmit,
        inform,
    });

    const theme = useTheme();

    return (
        <Box
            pt={2}
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
        >
            {!disableHideOnNotDirty && !isDirty ? null : (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Action.TextButton
                        text={cancelText}
                        icon={cancelIcon}
                        symbolProps={{ color: theme.palette.error.main }}
                        onClick={() => reset()}
                    />
                    <Action.TextButton
                        text={confirmText}
                        icon={confirmIcon}
                        symbolProps={{ color: theme.palette.success.main }}
                        onClick={handleSubmit(onSubmit)}
                    />
                </Stack>
            )}
            <Feedback.Inform {...informProps} />
        </Box>
    );
}

const useResetStale = (
    reset: (values: FieldValues) => void,
    values: FieldValues
) => {
    useEffect(() => {
        reset(values);
    }, [values]);
};

export const FormUI = {
    Label,
    Wrapper,
    HStack,
    VStack,
    AStack,
    Actions,
    SocketActions,
    TextAdornment,
    useResetStale,
};

/*                <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    {cancelText}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                >
                    {confirmText}
                </Button> */

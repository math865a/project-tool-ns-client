import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    ButtonBaseProps,
    ButtonProps,
    IconButton,
    IconButtonProps,
    Tooltip,
    TooltipProps,
    Typography,
    TypographyProps,
} from "@mui/material";
import { Link as RemixLink } from "@remix-run/react";
import React, { forwardRef, useMemo } from "react";
import {
    Child,
    IconDef,
    Symbol as SymbolComponent,
    SymbolProps,
} from "../index";

export namespace ActionTypes {
    export type ITooltipPlacement =
        | "bottom"
        | "left"
        | "right"
        | "top"
        | "bottom-end"
        | "bottom-start"
        | "left-end"
        | "left-start"
        | "right-end"
        | "right-start"
        | "top-end"
        | "top-start"
        | undefined;

    export interface IIconActionProps extends IconButtonProps {
        icon?: IconDef;
        iconSize?: number;
        symbolProps?: Omit<SymbolProps, "icon" | "size">;
        to?: string;
        handleProps?: any;
    }

    export interface IActionTooltipProps extends IIconActionProps {
        title?: string;
        placement?: ITooltipPlacement;
        tooltipProps?: TooltipProps;
    }
}

const SymbolBase = React.forwardRef<
    HTMLButtonElement,
    ActionTypes.IIconActionProps
>(({ icon, iconSize, symbolProps, to, handleProps, ...rest }, ref) => {
    if (to) {
        return (
            <IconButton
                {...rest}
                {...handleProps}
                ref={ref}
                component={RemixLink}
                to={to}
                prefetch="intent"
                sx={{
                    borderRadius: "50%",
                    width: "min-content",
                    height: "min-content",
                }}
            >
                <SymbolComponent icon={icon} size={iconSize} {...symbolProps} />
            </IconButton>
        );
    }

    return (
        <IconButton {...rest} ref={ref} {...handleProps}>
            <SymbolComponent icon={icon} size={iconSize} {...symbolProps} />
        </IconButton>
    );
});

const Symbol = React.forwardRef<
    HTMLButtonElement,
    ActionTypes.IActionTooltipProps
>(({ title, placement = "right", tooltipProps, handleProps, ...rest }, ref) => {
    if (!title) {
        return <SymbolBase {...rest} ref={ref} />;
    }
    return (
        <Tooltip title={title} placement="top" arrow {...tooltipProps}>
            <SymbolBase {...rest} handleProps={handleProps} ref={ref} />
        </Tooltip>
    );
});

function Link({
    to,
    children,
    reverse = false,
}: {
    to: string;
    children: Child | Child[];
    reverse?: boolean;
}) {
    return (
        <Button
            component={RemixLink}
            to={to}
            sx={{
                textDecoration: "none",
                color: "inherit",
                flexDirection: reverse ? "row-reverse" : "row",
            }}
        >
            {children}
        </Button>
    );
}

export interface ITextLinkProps {
    to: string;
    text: string;
    icon?: IconDef;
    iconSize?: number;
    textProps?: TypographyProps;
    symbolProps?: Omit<SymbolProps, "icon" | "size">;
    spacing?: number;
    fontSize?: number;
    disabled?: boolean;
}

export interface TextButtonProps {
    text: string;
    icon?: IconDef;
    iconSize?: number;
    spacing?: number;
    symbolProps?: Omit<SymbolProps, "size" | "icon">;
    fontSize?: number;
    textColor?: string;
    reverse?: boolean;
    color?: string;
    pbText?: number;
    disabled?: boolean;
    ptText?: number;
    justText?: boolean;
    textProps?: TypographyProps;
}

export type TextLinkProps = TextButtonProps & { to: string };

const TextButton = React.forwardRef<
    HTMLButtonElement,
    TextButtonProps & ButtonProps
>(
    (
        {
            text,
            icon,
            iconSize = 20,
            fontSize = 13,
            spacing = 1,
            symbolProps = {},
            textColor = "text.primary",
            reverse = false,
            pbText = 0,
            ptText = 0,
            textProps = {},
            justText,
            ...buttonProps
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                sx={{
                    color: !buttonProps.color
                        ? "text.primary"
                        : buttonProps.color,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: reverse ? "row-reverse" : "row",
                }}
                {...buttonProps}
            >
                <SymbolComponent
                    icon={icon}
                    size={iconSize}
                    {...{
                        ...symbolProps,
                        color: !icon
                            ? "transparent"
                            : buttonProps?.disabled
                            ? "grey.400"
                            : symbolProps.color
                            ? symbolProps.color
                            : "inherit",
                    }}
                />
                <Typography
                    pb={pbText}
                    pt={ptText}
                    fontSize={fontSize}
                    pr={!icon || !reverse ? 0 : spacing}
                    pl={!icon || reverse ? 0 : spacing}
                    color={(theme) =>
                        buttonProps?.disabled
                            ? theme.palette.grey[400]
                            : textColor
                    }
                    {...textProps}
                >
                    {text}
                </Typography>
            </Button>
        );
    }
);

function TextLink({
    text,
    icon,
    iconSize = 1,
    fontSize = 13,
    spacing = 1,
    pbText = 0,
    ptText = 0,
    symbolProps = {},
    textColor = "text.primary",
    reverse = false,
    to,
    color,
    justText,
    textProps = {},
    disabled,
}: TextLinkProps) {
    const baseProps = useMemo(() => {
        return justText
            ? ({
                  display: "flex",
                  alignItems: "center",
                  flexDirection: reverse ? "row-reverse" : "row",
              } as any)
            : ({
                  sx: {
                      alignItems: "center",
                      flexDirection: reverse ? "row-reverse" : "row",
                      color: !color ? "inherit" : color,
                  },
                  component: RemixLink,
                  to,
                  disabled,
              } as any);
    }, []);

    const Base = ({ children }: { children: Child | Child[] }) => {
        return justText ? (
            <Box {...baseProps}>{children}</Box>
        ) : (
            <Button {...baseProps}>{children}</Button>
        );
    };
    return (
        <Base>
            <SymbolComponent
                icon={icon}
                size={iconSize}
                {...{
                    ...symbolProps,
                    color: !icon
                        ? "transparent"
                        : disabled
                        ? "grey.400"
                        : symbolProps.color
                        ? symbolProps.color
                        : "inherit",
                }}
            />
            <Typography
                pb={pbText}
                pt={ptText}
                fontSize={fontSize}
                pr={!icon || !reverse ? 0 : spacing}
                pl={!icon || reverse ? 0 : spacing}
                sx={{
                    color: (theme) =>
                        disabled ? theme.palette.grey[400] : textColor,
                }}
                {...textProps}
            >
                {text}
            </Typography>
        </Base>
    );
}

interface ICircleButtonProps extends ButtonBaseProps {
    tooltip?: string;
    d?: number;
    backgroundColor?: string;
    color?: string;
    children?: Child | Child[];
}

const AvatarButton = forwardRef<HTMLButtonElement, ICircleButtonProps>(
    ({ tooltip, d = 25, backgroundColor, color, children, ...props }, ref) => {
        const AvatarComponent = () => (
            <Avatar
                component={ButtonBase}
                ref={ref}
                {...props}
                sx={{
                    width: d,
                    height: d,
                    backgroundColor,
                    color,
                }}
            >
                {children}
            </Avatar>
        );

        if (tooltip) {
            return (
                <Tooltip title={tooltip}>
                    <AvatarComponent />
                </Tooltip>
            );
        }
        return <AvatarComponent />;
    }
);

export const Action = {
    Symbol,
    Link,
    Avatar: AvatarButton,
    TextLink,
    TextButton,
};

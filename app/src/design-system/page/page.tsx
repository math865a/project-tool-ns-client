import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";

import { disableInteraction } from "~/styles";
import {
    Box,
    BoxProps,
    Breadcrumbs,
    Container,
    Divider,
    Grid2Props,
    Paper,
    Stack,
    Tooltip,
    Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";

import { Link } from "@remix-run/react";
import React, { createContext, useMemo } from "react";
import { IconDef, Symbol, SymbolProps } from "../index";
import { Child } from "../types";

function Root({
    children,
    maxWidth = "lg",
    fixed = true,
}: {
    children: Child | Child[];
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    fixed?: boolean;
}) {
    return (
        <Container maxWidth={maxWidth} sx={{ pt: 4 }}>
            {children}
        </Container>
    );
}

function Layout({
    children,
    columns = { xs: 12 },
    spacing = { xs: 4 },
    ...props
}: {
    children?: Child | Child[];
} & Grid2Props) {
    return (
        <Grid
            container
            columns={columns}
            spacing={spacing}
            {...props}
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            {children}
        </Grid>
    );
}

function SubLayout({
    children,
    xs = 12,
    ...props
}: { children: Child | Child[] } & Grid2Props) {
    return (
        <Grid xs={xs} sx={{ p: 0 }} {...props}>
            {children}
        </Grid>
    );
}

function Header({
    children = <Box />,
    actions = <Box />,
    pb,
    divider = false,
}: {
    children?: Child | Child[];
    actions?: Child | Child[];
    pb?: number;
    divider?: boolean;
}) {
    return (
        <>
            <Grid xs={12}>
                <Box
                    flexGrow={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pb={pb ? pb : divider ? 2 : 0}
                >
                    {children}
                    <Box>{actions}</Box>
                </Box>
                {divider && <Divider />}
            </Grid>
        </>
    );
}

function Title({ title }: { title: string }) {
    return <Typography>{title}</Typography>;
}

function Tags({ children }: { children: Child | Child[] }) {
    return (
        <Breadcrumbs
            separator={<Typography color="rgba(0,0,0,0.4)"></Typography>}
            sx={{ pb: 0.5 }}
        >
            {children}
        </Breadcrumbs>
    );
}

function Tag({
    title = "",
    to,
    tooltip,
    icon,
    bold = false,
    disabled,
}: {
    title?: string;
    to?: string;
    tooltip?: string;
    icon?: IconDef;
    bold?: boolean;
    disabled?: boolean;
}) {
    const linkProps: BoxProps = useMemo(() => {
        if (to && !disabled) {
            return {
                component: Link,
                to,
                sx: {
                    textDecoration: "none",
                    color: "inherit",
                    "&: hover": {
                        textDecoration: "underline",
                    },
                },
            };
        }
        return {
            sx: {
                pointerEvents: "none",
                userSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
            },
        };
    }, [to]);

    const componentProps = useMemo(() => {
        return {
            title,
            linkProps,
            icon,
            bold,
        };
    }, [title, linkProps, icon, bold]);

    if (!title && !icon) return null;

    if (tooltip) {
        return (
            <Tooltip title={title}>
                <TagComponent {...componentProps} />
            </Tooltip>
        );
    }
    return <TagComponent {...componentProps} />;
}

const TagComponent = React.forwardRef(
    (
        {
            bold,
            linkProps,
            title,
            icon,
        }: {
            linkProps: BoxProps;
            title: string;
            bold: boolean;
            icon?: IconDef;
        },
        ref: any
    ) => {
        return (
            <Box
                display="flex"
                alignItems="center"
                {...linkProps}
                mx={1.5}
                ref={ref}
            >
                <Symbol icon={icon} size={0.9} />
                <Typography
                    pl={1}
                    fontSize={13.5}
                    color={bold ? "text.primary" : "text.secondary"}
                    fontWeight={bold ? "semibold" : "lighter"}
                    //fontStyle={bold ? "normal" : "italic"}
                >
                    {title}
                </Typography>
            </Box>
        );
    }
);

export interface ISectionProps extends ISectionUIProps {
    xs?: number | boolean | "auto";
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    alignSelf?: "flex-start" | "center" | "flex-end" | "stretch";
}

const Section = React.forwardRef<HTMLDivElement, ISectionProps>(
    (props, ref) => {
        const {
            xs = props.variant === "view" ? 12 : 12,
            sm,
            md,
            lg,
            xxl,
            xl,
            alignSelf,
            ...rest
        } = props;

        return (
            <Grid
                ref={ref}
                xs={xs}
                sm={sm}
                lg={lg}
                xl={xl}
                md={md}
                xxl={xxl}
                alignSelf={alignSelf}
            >
                <SectionUI {...rest} />
            </Grid>
        );
    }
);

export interface ISectionUIProps {
    children: Child | Child[];
    title?: string | Child | Child[];
    subtitle?: string;
    startActions?: Child | Child[];
    endActions?: Child | Child[];
    titleSize?: number;
    titleColor?: string;
    titleIcon?: IconDef;
    titleIconSize?: number;
    titleIconProps?: Omit<SymbolProps, "icon" | "size">;
    px?: number;
    py?: number;
    pb?: number;
    pt?: number;
    titlePadding?: number;
    minHeight?: number | string;
    maxHeight?: number | string;
    disableBorder?: boolean;
    height?: number | string;
    variant?: "default" | "view";
    backgroundColor?: string;
    handleProps?: any;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
    transition?: string | null;
    width?: number | string;
    pxTitle?: number;
    overflowX?: boolean;
    overflowY?: boolean;
}

const DimContext = createContext<{ height: number; width: number }>({
    height: 0,
    width: 0,
});

const SectionUI = React.forwardRef<HTMLDivElement, ISectionUIProps>(
    (
        {
            children,
            startActions = <Box />,
            title,
            subtitle,
            titleSize = 14,
            variant = "default",
            endActions,
            px = variant === "view" ? 0 : 3,
            py = variant === "view" ? 0 : 3,
            titlePadding = 2,
            height = "100%",
            disableBorder = variant === "view",
            minHeight,
            titleIcon,
            titleIconSize,
            titleIconProps,
            pb = py,
            pt = py,
            maxHeight,
            backgroundColor = "#FEFEFE",
            transform,
            handleProps,
            listeners,
            transition,
            width,
            titleColor = "#1c1c1c", // 'text.secondary',
            pxTitle,
            overflowX = false,
            overflowY = false,
        },
        ref
    ) => {
        return (
            <Paper
                ref={ref}
                sx={{
                    height,
                    maxHeight: maxHeight || height,
                    minHeight: minHeight || height,
                    overflowY: overflowY ? undefined : "hidden",
                    overflowX: overflowX ? undefined : "hidden",
                    flexGrow: 1,
                    py,
                    pb,
                    px,
                    pt,
                    borderRadius: 4,
                    width,
                    minWidth: width,
                    maxWidth: width,
                    backgroundColor,
                    borderColor: disableBorder ? "transparent" : undefined,
                    transition,
                    transform: transform
                        ? CSS.Transform.toString(transform)
                        : undefined,
                }}
                variant="outlined"
                {...listeners}
                {...handleProps}
            >
                <Box
                    flexGrow={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="column"
                    height="100%"
                    width="100%"
                >
                    <Stack width="100%" spacing={0} sx={{ zIndex: 10 }}>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            pb={titlePadding}
                            px={pxTitle}
                            maxHeight={30}
                        >
                            <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                                style={
                                    disableInteraction as React.CSSProperties
                                }
                            >
                                {titleIcon && (
                                    <Symbol
                                        icon={titleIcon}
                                        color={"#1C1C1C"}
                                        size={titleIconSize}
                                        {...titleIconProps}
                                    />
                                )}
                                {typeof title === "string" ? (
                                    <Typography
                                        sx={{
                                            WebkitFontSmoothing: "antialiased",
                                            MozOsxFontSmoothing: "grayscale",
                                        }}
                                        fontSize={titleSize}
                                        color={titleColor}
                                        fontWeight="bolder"
                                        //  variant="overline"
                                        // fontFamily="Inter"
                                    >
                                        {title}
                                    </Typography>
                                ) : (
                                    title
                                )}
                            </Stack>
                            {startActions}
                        </Box>
                        <Box
                            display="flex"
                            flexGrow={1}
                            maxHeight="100%"
                            sx={{
                                overflowY: overflowY ? undefined : "hidden",
                                overflowX: overflowX ? undefined : "hidden",
                            }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            {children}
                        </Box>
                    </Stack>

                    {endActions && (
                        <Box
                            flexGrow={1}
                            display="flex"
                            maxHeight={30}
                            width="100%"
                            sx={{ backgroundColor }}
                            zIndex={20}
                        >
                            {endActions}
                        </Box>
                    )}
                </Box>
            </Paper>
        );
    }
);

export const Page = {
    Title,
    Layout,
    Section,
    Tags,
    Tag,
    Header,
    Root,
    SectionUI,
    SubLayout,
};

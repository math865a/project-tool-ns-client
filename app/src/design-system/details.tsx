import { disableInteraction } from  "~/styles";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import v from "voca";
import { IconDef, Symbol, SymbolProps } from "./symbol";
import type { Child } from "./types";

interface Props {
    children?: Child | Child[];
    spacing?: number;
}
function Container({ children, spacing = 1.5 }: Props) {
    return (
        <Box flexGrow={1} pt={1} width="100%">
            <Stack flexGrow={1} spacing={spacing} sx={{ width: "100%" }}>
                {children}
            </Stack>
        </Box>
    );
}


export interface IKeyValueDetailItemProps {
    title?: string | Child;
    icon?: IconDef;
    symbolProps?: SymbolProps;
    value?: string | null | Child;
    valueIcon?: JSX.Element;
    variant?: "description";
    action?: Child | Child[];
    xsTitle?: number;
    xsValue?: number;
    disableSpacing?: boolean;
    justifyValue?: "center" | "flex-start" | "flex-end";
    align?: "center" | "flex-start" | "flex-end";
    showAction?: boolean;
    errorText?: string;
}

function Item({
    title = "",
    value = "---",
    valueIcon,
    icon,
    symbolProps,
    action,
    xsTitle = 5,
    xsValue = 8,
    disableSpacing = false,
    justifyValue,
    align = "center",
    showAction,
    errorText,
}: IKeyValueDetailItemProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <Box
            width="100%"
            pl={3}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Stack flexGrow={1}>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ height: 25 }}
                >
                    {typeof title === "string" ? (
                        <Typography
                            textAlign="left"
                            fontSize={13}
                            fontWeight="semibold"
                            style={disableInteraction as React.CSSProperties}
                           
                        >
                            {title}
                        </Typography>
                    ) : (
                        title
                    )}

                    <Box>
                        {action ? (
                            isHovering || showAction ? (
                                action
                            ) : null
                        ) : icon ? (
                            <Symbol size={1} icon={icon} {...symbolProps} />
                        ) : null}
                    </Box>
                </Stack>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={justifyValue}
                    flexGrow={1}
                >
                    {valueIcon}
                    {typeof value === "string" && (
                        <Typography
                            sx={{
                                color: (theme) => theme.palette.text.secondary,
                            }}
                        >
                            {!value ? " - " : value}
                        </Typography>
                    )}
                    <Stack flexGrow={1} spacing={0.5}>
                        {typeof value === "object" && value}
                        {errorText && (
                            <Typography color="error" fontSize={12}>
                                {errorText}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}


function getAvatarName(name: string) {
    const split = v.split(name, " ");
    if (split.length === 1) {
        return v.upperCase(v.substr(name, 0, 2));
    }
    if (split.length > 2) {
        const last = split[split.length - 1];
        return v.upperCase(name[0] + last[0]);
    }
    return v.upperCase(name[0] + split[1][0]);
}

function PersonItem({
    name,
    subname,
    color,
    title,
}: {
    name: string;
    subname?: string;
    color: string;
    title?: string;
}) {
    return (
        <Box flexGrow={1}>
            {title && <Typography pb={1}>{title}</Typography>}
            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ height: 25, width: 25, color }}>
                    <Typography fontWeight="bold">
                        {getAvatarName(name)}
                    </Typography>
                </Avatar>
                <Stack>
                    <Typography
                        sx={{ color: (theme) => theme.palette.text.primary }}
                    >
                        {name}
                    </Typography>
                    {subname && (
                        <Typography
                            sx={{
                                color: (theme) => theme.palette.text.secondary,
                            }}
                        >
                            {subname}
                        </Typography>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}

export const Details = {
    Container,
    Item,
    PersonItem,
};

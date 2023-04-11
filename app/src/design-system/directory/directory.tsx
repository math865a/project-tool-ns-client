import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemTextProps,
    ListProps,
    ListItemProps,
    MenuItemProps,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { Child } from "../types";
import { IconDef, Symbol } from "../symbol";

export namespace DirectoryTypes {
    export interface IWrapperProps extends ListProps {
        children: Child | Child[];
    }

    export interface ISectionProps {
        title?: string;
        action?: Child | Child[];
        children?: Child | Child[];
        size?: "sm" | "md" | "lg";
        gap?: number;
    }

    export interface IItemProps extends ListItemProps {
        children?: Child | Child[];
    }

    export interface ILinkProps extends IItemProps {
        to: string;
        isRoot?: boolean;
        activeUrl?: string;
    }

    export interface IButtonProps extends Omit<IItemProps, "onClick"> {
        onClick?: (
            event: React.MouseEvent<HTMLDivElement, MouseEvent>,
            params: any
        ) => void;
        params?: any;
        isActive?: boolean;
        borderRadius?: number;
        maxHeight?: number;
    }

    export interface ITextProps extends ListItemTextProps {}
}

function Wrapper({ children, ...props }: DirectoryTypes.IWrapperProps) {
    return <List {...props}>{children}</List>;
}

function Item({ children, ...props }: DirectoryTypes.IItemProps) {
    return <ListItem {...props}>{children}</ListItem>;
}

function Link({
    children,
    to,
    isRoot = false,
    activeUrl = to,
    ...props
}: DirectoryTypes.ILinkProps) {
    const location = useLocation();

    const isActive = useMemo(() => {
        const { pathname: p } = location;
        if (isRoot) return p === activeUrl;
        return p.includes(activeUrl);
    }, [location.pathname, activeUrl]);

    return (
        <Item dense {...props}>
            <ListItemButton
                selected={isActive}
                component={RouterLink}
                prefetch="intent"
                to={to}
                sx={{ borderRadius: 2 }}
            >
                {children}
            </ListItemButton>
        </Item>
    );
}

function Button({
    children,
    onClick,
    params,
    borderRadius = 2,
    maxHeight,
    isActive = false,
    ...props
}: DirectoryTypes.IButtonProps) {
    return (
        <Item dense sx={{ overflow: "hidden", maxHeight }} {...props}>
            <ListItemButton
                onClick={(event) => (onClick ? onClick(event, params) : null)}
                sx={{ borderRadius, maxHeight }}
            >
                {children}
            </ListItemButton>
        </Item>
    );
}

function Text({ primary, secondary, ...rest }: DirectoryTypes.ITextProps) {
    return (
        <ListItemText
            primary={primary}
            secondary={secondary}
            primaryTypographyProps={{
                fontWeight: 450,
                fontSize: 13,
                letterSpacing: "0.025rem",
            }}
        />
    );
}

export type IContextMenuItemProps = { onClick?: MenuItemProps["onClick"] } & {
    icon?: IconDef;
    label: string;
    disabled?: boolean;
    divider?: boolean;
    to?: string;
    space?: boolean;
    iconSize?: number
    selected?: boolean
};

function ContextMenuItem(props: IContextMenuItemProps) {
    return (
        <MenuItem
            disabled={props.disabled ?? false}
            divider={props.divider ?? false}
            onClick={props.onClick}
            selected={props.selected ?? false}
            sx={{ py: 1, mb: props.space ? 0.75 : 0 }}
            {...(props.to ? { component: RouterLink, to: props.to } : {})}
        >
            <ListItemIcon>
                {props.icon && <Symbol icon={props.icon} size={props.iconSize ?? 1} />}
            </ListItemIcon>
            <ListItemText
                primary={props.label}
                primaryTypographyProps={{
                    fontSize: 12,
                }}
            />
        </MenuItem>
    );
}

export const Directory = {
    Wrapper,
    Link,
    Item,
    Button,
    Text,
    ContextMenuItem,
};

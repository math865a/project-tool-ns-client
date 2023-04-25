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
    Stack,
    TypographyProps,
    Box,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "@remix-run/react";
import { createContext, useContext, useMemo } from "react";
import { Child } from "../types";
import { IconDef, Symbol, SymbolProps } from "../symbol";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src";

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

    export interface ILinkProps extends Omit<IItemProps, "children" | "onClick"> {
        to?: string;
        onClick?: (
            event: React.MouseEvent<HTMLDivElement, MouseEvent>
        ) => void;
        isRoot?: boolean;
        activeUrl?: string;
        children: ((isActive: boolean) => Child | Child[]) | Child | Child[];
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
        icon?: IconDef;
        title?: string;

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
    onClick,
    ...props
}: DirectoryTypes.ILinkProps) {
    const location = useLocation();

    const isActive = useMemo(() => {
        if (!to || !activeUrl ) return false
        const { pathname: p } = location;
        if (isRoot) return p === activeUrl;
        return p.includes(activeUrl);
    }, [location.pathname, activeUrl]);


    const buttonProps = useMemo(() => {
        if (onClick){
            return {
                component: Box,
                onClick: onClick
            }
        }
        return {
            component: RouterLink,
            prefetch: "intent",
            to: to,
            selected: isActive
        }
    },[isActive, onClick, to])

    return (
        <Item dense {...props}>
            <ListItemButton
      
                {...buttonProps}
                sx={{
                    borderRadius: 1,
                    "&.Mui-selected": {
                        backgroundColor: "#95a4fc90",
                        "&:hover": {
                            backgroundColor: "#95a4fc30",
                        },
                    },
                    "&:hover": {
                        backgroundColor: "#95a4fc1A",
                    },
                    ...props["sx"],
                }}
            >
                {typeof children === "function" ? children(isActive) : children}
            </ListItemButton>
        </Item>
    );
}

function Button({
    children,
    onClick,
    params,
    borderRadius = 1,
    maxHeight,
    isActive = false,
    icon,
    title,

    ...props
}: DirectoryTypes.IButtonProps) {
    return (
        <Item dense sx={{ overflow: "hidden", maxHeight }} {...props} >
            <ListItemButton
                onClick={(event) => (onClick ? onClick(event, params) : null)}
                sx={{
                    borderRadius,
                    maxHeight,
                    "&.Mui-selected": {
                        backgroundColor: "#95a4fc90",
                        "&:hover": {
                            backgroundColor: "#95a4fc30",
                        },
                    },
                    "&:hover": {
                        backgroundColor: "#95a4fc1A",
                    },
                }}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <Symbol icon={icon} size={1} fixedWidth />
                        </ListItemIcon>
                        <ListItemText
                            primary={title}
                            primaryTypographyProps={{
                                fontSize: 13,
                                color: isActive
                                    ? "text.primary"
                                    : "text.secondary",
                            }}
                        />
                    </>
                )}
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
    iconSize?: number;
    selected?: boolean;
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
                {props.icon && (
                    <Symbol icon={props.icon} size={props.iconSize ?? 1} />
                )}
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

export interface IPageLink {
    to?: string;
    onClick?: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
    icon: IconDef;
    activeIcon?: IconDef;
    title: string;
    subtitle?: string;
    root?: boolean;
    space?: boolean;
    permission?: {
        action: Action;
        subject: Subject;
    };
}

function PageLinks({
    links,
    children,
    orientation = "row",
}: {
    links?: IPageLink[];
    children?: Child | Child[];
    orientation?: "row" | "column";
}) {
    return (
        <Stack
            display="flex"
            direction={orientation}
            spacing={orientation === "row" ? 1 : 0.5}
            px={orientation === "column" ? 2.5 : 0}
        >
            {children
                ? children
                : links?.map((link, i) => {
                      if (link.permission) {
                          return (
                              <Can
                                  I={link.permission.action}
                                  a={link.permission.subject}
                                  key={link.to}
                              >
                                  <PageLink
                                      {...link}
                                      orientation={orientation}
                                  />
                              </Can>
                          );
                      }
                      return (
                          <PageLink
                              key={link.to}
                              {...link}
                              orientation={orientation}
                          />
                      );
                  })}
        </Stack>
    );
}

function PageLink({
    to,
    icon,
    title,
    root = false,
    activeIcon = icon,
    space,
    orientation,
    onClick
}: IPageLink & { orientation?: "row" | "column" }) {
    return (
        <Directory.Link
            to={to}
            isRoot={root}
            onClick={onClick}
            sx={{ mb: space ? 2 : orientation === "column" ? 0.5 : 0 }}
        >
            {(isActive) => (
                <>
                    <ListItemIcon
                        sx={{ minWidth: orientation === "column" ? 40 : 30 }}
                    >
                        <Symbol
                            icon={isActive ? activeIcon : icon}
                            size={1}
                            fixedWidth
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{
                            fontSize: 13,
                            color:
                                isActive || orientation === "column"
                                    ? "text.primary"
                                    : "text.secondary",
                        }}
                    />
                </>
            )}
        </Directory.Link>
    );
}

export interface ITitleProps {
    icon?: IconDef;

    title?: string;
    subtitle?: string;
    titleProps?: TypographyProps;
    subtitleProps?: TypographyProps;
    iconProps?: Omit<SymbolProps, "icon">;
}

function Title({
    icon,
    title,
    subtitle,
    subtitleProps,
    titleProps,
    iconProps,
}: ITitleProps) {
    return (
        <ListItem component={Box} sx={{ width: "max-content" }}>
            {icon && (
                <ListItemIcon>
                    <Symbol icon={icon} {...iconProps} size={1} />
                </ListItemIcon>
            )}
            <ListItemText
                primary={title}
                secondary={subtitle}
                primaryTypographyProps={titleProps}
                secondaryTypographyProps={subtitleProps}
            />
        </ListItem>
    );
}

export const Directory = {
    Wrapper,
    Link,
    Item,
    Button,
    Text,
    ContextMenuItem,
    PageLinks,
    PageLink,
    Title,
};

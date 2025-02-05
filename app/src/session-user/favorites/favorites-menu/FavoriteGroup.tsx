import { useDisclosure } from "@mantine/hooks";

import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Action, Child, Symbol } from "design";
import { useMemo } from "react";
import { FavoriteGroupName } from "../types";
import { FavoriteItem } from "./FavoriteItem";
import { useSession } from "../../SessionContextProvider";
import { Favorite } from "~/src/_definitions";
import {
    IconBriefcase,
    IconChevronDown,
    IconChevronUp,
    IconUser,
} from "@tabler/icons-react";

interface FavoriteGroupProps {
    name: FavoriteGroupName;
    items: Favorite[];
    renderStartComponent?: (item: Favorite) => Child | Child[];
    divider?: boolean;
}

export function FavoriteGroup({
    name,
    items,
    renderStartComponent,
    divider,
}: FavoriteGroupProps) {
    const [expanded, handlers] = useDisclosure(true);

    const {
        favorites: { onClose: handleClose },
    } = useSession();

    const props = useMemo(() => {
        switch (name) {
            case "resourceFavorites":
                return {
                    icon: IconUser,
                    title: "Ressourcer",
                    url: "/app/resources/",
                };
            default:
                return {
                    icon: IconBriefcase,
                    title: "Arbejdspakker",
                    url: "/app/workpackages/",
                };
        }
    }, [name]);

    if (items.length === 0) return <></>;

    return (
        <>
            <ListItem
                secondaryAction={
                    <Action.Symbol
                        icon={expanded ? IconChevronDown : IconChevronUp}
                        onClick={handlers.toggle}
                    />
                }
            >
                <ListItemIcon sx={{ minWidth: 25 }}>
                    <Symbol icon={props.icon} size={0.9} />
                </ListItemIcon>
                <ListItemText
                    primary={props.title}
                    primaryTypographyProps={{ fontSize: 12 }}
                />
            </ListItem>

            <Collapse in={expanded}>
                <List sx={{ px: 4, flexGrow: 1 }}>
                    {items.map((d) => (
                        <FavoriteItem
                            record={d}
                            baseUrl={props.url}
                            key={d.id}
                            handleClose={handleClose}
                            startComponent={
                                renderStartComponent
                                    ? renderStartComponent(d)
                                    : undefined
                            }
                        />
                    ))}
                </List>
            </Collapse>
        </>
    );
}

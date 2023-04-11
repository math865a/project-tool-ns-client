import { List, ListItem, ListItemText, Menu } from "@mui/material";
import { Avatars } from "design";
import { useSession } from "../../SessionContextProvider";
import { FavoriteGroup } from "./FavoriteGroup";
import { NoFavorites } from "./NoFavorites";

export default function FavoritesMenu() {
    const {
        favorites: { groupedFavorites, isEmpty, open, onClose, anchorEl },
    } = useSession();

    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    minWidth: 250,
                    p: 1,
                },
            }}
        >
            <ListItem alignItems="center" sx={{ px: 2 }}>
                <ListItemText
                    primary="Favoritter"
                    primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: 12,
                    }}
                />
            </ListItem>
            {isEmpty && <NoFavorites />}
            <List sx={{ pl: 2 }}>
                <FavoriteGroup
                    name="resourceFavorites"
                    items={groupedFavorites.resourceFavorites}
                    renderStartComponent={(item) => (
                        <Avatars.Individual
                            size={23}
                            subject={{
                                id: item.id,
                                name: item.name,
                                color:
                                    item.type === "Ressourcer"
                                        ? item.color
                                        : "",
                            }}
                        />
                    )}
                />
                <FavoriteGroup
                    name="workpackageFavorites"
                    items={groupedFavorites.workpackageFavorites}
                />
            </List>
        </Menu>
    );
}

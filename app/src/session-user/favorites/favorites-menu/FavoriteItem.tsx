import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { useHover } from "@mantine/hooks";
import { FavoriteRecord } from "@math865a/project-tool.types";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import { Link } from "@remix-run/react";
import { Action, Child } from "design";
import { useMemo } from "react";
import { useSession } from "../../SessionContextProvider";
import { Favorite } from "~/src/_definitions";

export type FavoriteItemProps = {
    record: Favorite;
    startComponent?: Child | Child[];
    handleClose: () => void;
    baseUrl: string
};

export function FavoriteItem({
    startComponent,
    record,
    handleClose,
    baseUrl
}: FavoriteItemProps) {
    const { name, id } = record;
    const {
        favorites: { removeFavorite },
    } = useSession();
    const theme = useTheme();

    const url = useMemo(() => {
        return baseUrl + id
    }, [baseUrl, id]);

    const { hovered, ref } = useHover<HTMLLIElement>();

    return (
        <ListItem
            ref={ref}
            secondaryAction={
                hovered ? (
                    <Action.Symbol
                        icon={faTimes}
                        symbolProps={{ color: theme.palette.error.main }}
                        onClick={() => removeFavorite(record.id)}
                        title="Fjern som favorit"
                    />
                ) : (
                    <></>
                )
            }
        >
            {startComponent && (
                <ListItemAvatar sx={{ minWidth: 35 }}>
                    {startComponent}
                </ListItemAvatar>
            )}
       
                <ListItemText
 
                    disableTypography
                    primary={
                        <Typography
                            component={Link}
                            to={url}
                            fontSize={12}
                            onClick={() => handleClose()}
                            sx={{
                                color: "text.primary",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            {name}
                        </Typography>
                    }
                />
        
        </ListItem>
    );
}

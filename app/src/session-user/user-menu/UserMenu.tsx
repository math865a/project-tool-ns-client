import {
    ButtonBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
} from "@mui/material";
import { useMenuState } from "~/src/hooks/useMenu";
import { Form, Link } from "@remix-run/react";
import { Avatars, Symbol } from "~/src/design-system";
import { useSession } from "../SessionContextProvider";
import { IconDoorExit, IconUser } from "@tabler/icons-react";

export function UserMenu(
    props: Omit<ReturnType<typeof useMenuState>, "handleOpen">
) {
    const { user } = useSession();

    return (
        <Menu
            {...props}
            sx={{
                "& .MuiList-root": {
                    paddingBottom: 0.5,
                    paddingTop: 0.5,
                },
            }}
        >
            <ListItem divider sx={{ py: 2, px: 3 }}>
                <ListItemAvatar sx={{ minWidth: 45 }}>
                    <Avatars.Individual
                        size={30}
                        fontSize={13}
                        subject={{
                            id: user.uid,
                            name: user.name,
                            color: user.color,
                        }}
                    />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
            </ListItem>
            <ListItem sx={{ flexGrow: 1 }}>
                <List sx={{ flexGrow: 1 }}>
                    <ListItem dense>
                        <ListItemButton
                            onClick={props.onClose}
                            component={Link}
                            to="/app/session"
                            sx={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItemIcon>
                                <Symbol icon={IconUser} size={1.1} />
                            </ListItemIcon>
                            <ListItemText primary="Kontodetaljer" />
                        </ListItemButton>
                    </ListItem>
                    <Form action="/app/session" method="post">
                        <ListItem dense>
                            <ListItemButton
                                component={ButtonBase}
                                type="submit"
                                onClick={props.onClose}
                            >
                                <ListItemIcon>
                                    <Symbol icon={IconDoorExit} size={1.1} />
                                </ListItemIcon>
                                <ListItemText primary="Log ud" />
                            </ListItemButton>
                        </ListItem>
                    </Form>
                </List>
            </ListItem>
        </Menu>
    );
}

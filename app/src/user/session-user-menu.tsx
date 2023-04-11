import { faDoorOpen, faLock, faUser } from '@fortawesome/pro-light-svg-icons';
import { Action, Symbol } from 'design';
import { getAvatarName, getContrastColor } from '~/util';
import {
    Avatar,
    ButtonBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from '@mui/material';
import { Link, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import { useSession } from '../session-user';

export default function SessionUser() {
    const {user} = useSession();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setAnchorEl((prev) => (prev ? null : event.currentTarget));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ButtonBase onClick={handleOpen} sx={{ borderRadius: '50%', p: 1 }}>
                <UserAvatar />
            </ButtonBase>
            <SessionMenu
                onClose={handleClose}
                open={open}
                anchorEl={anchorEl}
            />
        </>
    );
}

function UserAvatar({ size = 30 }: { size?: number }) {
    const {user} = useSession();

    return (
        <Avatar sx={{ backgroundColor: user.color, width: size, height: size }}>
            <Typography
                fontWeight="bold"
                sx={{ color: getContrastColor(user.color) }}
                fontSize={13}
            >
                {getAvatarName(user.name)}
            </Typography>
        </Avatar>
    );
}

function SessionMenu({
    open,
    onClose,
    anchorEl,
}: {
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}) {

    const {user} = useSession();
    const submit = useSubmit();
    const handleSignOut = () => {
        //usersocket?.emit("sign-out", {})
        submit({}, { method: 'post', replace: true, action: '/app' });
    };

    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            PaperProps={{ sx: { py: 0, minWidth: 150, backgroundColor: "#fff", borderRadius: 4 } }}
            sx={{
                py: 0,
                '& .MuiList-root': {
                    paddingBottom: 0.25,
                    paddingTop: 0,
                },
            }}
        >
            <ListItem divider sx={{ py: 2, px: 3 }}>
                <ListItemAvatar sx={{ minWidth: 45 }}>
                    <UserAvatar />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
            </ListItem>
            <ListItem sx={{ flexGrow: 1 }}>
                <List sx={{ flexGrow: 1 }}>
                    <ListItem dense>
                        <ListItemButton component={Link} to="/app/session" sx={{textDecoration: "none", color: "inherit"}}>
                            <ListItemIcon>
                                <Symbol icon={faUser} />
                            </ListItemIcon>
                            <ListItemText primary="Kontodetaljer" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem dense>
                        <ListItemButton onClick={handleSignOut}>
                            <ListItemIcon>
                                <Symbol icon={faDoorOpen} />
                            </ListItemIcon>
                            <ListItemText primary="Log ud" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </ListItem>
        </Menu>
    );
}

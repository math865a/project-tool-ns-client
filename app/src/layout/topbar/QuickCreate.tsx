import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import {
    faBriefcase,
    faUserPlus
} from "@fortawesome/pro-light-svg-icons";
import {
    ListItemIcon,
    ListItemText, Menu,
    MenuItem, useTheme
} from "@mui/material";
import { Link } from "@remix-run/react";
import { Action, Symbol } from "design";
import { useState } from "react";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";

export default function QuickCreate() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    

    return (
        <>
            <Action.TextButton
                icon={faPlus}
                iconSize={1}
                text="Opret"
                sx={{ color: theme.palette.success.main }}
                onClick={(event) =>
                    setAnchorEl((prev) => (prev ? null : event.currentTarget))
                }
            />

            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: { borderRadius: 3, backgroundColor: "#fff" },
                }}
            >
                <Can I={A.Write} a={Subject.Workpackages}>
                    <MenuItem
                        component={Link}
                        to="/app/workpackages/create"
                        prefetch="intent"
                        sx={{ py: 1 }}
                        onClick={() => setAnchorEl(null)}
                    >
                        <ListItemIcon>
                            <Symbol icon={faBriefcase} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Opret ny arbejdspakke"
                            primaryTypographyProps={{ fontSize: 12 }}
                        />
                    </MenuItem>
                </Can>
                <Can I={A.Write} a={Subject.Resources}>
                    <MenuItem
                        component={Link}
                        to="/app/resources/create"
                        prefetch="intent"
                        onClick={() => setAnchorEl(null)}
                        sx={{ py: 1 }}
                    >
                        <ListItemIcon>
                            <Symbol icon={faUserPlus} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Opret ressource"
                            primaryTypographyProps={{ fontSize: 12 }}
                        />
                    </MenuItem>
                </Can>
            </Menu>
        </>
    );
}

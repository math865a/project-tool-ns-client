import { ListItemIcon, ListItemText } from "@mui/material";
import { IconDef, Directory, Symbol } from "~/src/design-system";

interface IPageLinkProps {
    to: string;
    icon: IconDef;
    title: string;
    root?: boolean
}

export function PageLink({ to, icon, title, root = false }: IPageLinkProps) {
    return (
        <Directory.Link to={to} isRoot={root}>
            <ListItemIcon sx={{ minWidth: 25 }}>
                <Symbol icon={icon} size={0.9} />
            </ListItemIcon>
            <ListItemText
                primary={title}
                primaryTypographyProps={{ fontSize: 12 }}
            />
        </Directory.Link>
    );
}

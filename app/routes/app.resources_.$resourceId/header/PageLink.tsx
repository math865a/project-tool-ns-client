import { ListItemIcon, ListItemText } from "@mui/material";
import { Directory } from "~/src/design-system";
import { Icon } from "@tabler/icons-react";

interface IPageLinkProps {
    to: string;
    Icon: Icon;
    title: string;
    root?: boolean;
}

export function PageLink({ to, Icon, title, root = false }: IPageLinkProps) {
    return (
        <Directory.Link to={to} isRoot={root}>
            <ListItemIcon sx={{ minWidth: 25 }}>
                <Icon />
                {/*<Symbol icon={icon} size={0.9} />*/}
            </ListItemIcon>
            <ListItemText
                primary={title}
                primaryTypographyProps={{ fontSize: 12 }}
            />
        </Directory.Link>
    );
}

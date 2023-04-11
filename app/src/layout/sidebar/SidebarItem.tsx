import { ListItemIcon } from "@mui/material";
import { Directory, IconDef, Symbol } from "~/src/design-system";

export interface ISidebarItemProps {
    to: string;
    icon: IconDef;
    subject: string;
    isRoot?: boolean;
    space?: boolean;
    activeUrl?: string;
}

export default function SidebarItem({
    to,
    icon,
    subject,
    isRoot,
    space = false,
    activeUrl,
}: ISidebarItemProps) {
    return (
        <Directory.Link
            to={to}
            sx={{ mb: space ? 3 : 0.5 }}
            isRoot={isRoot}
            activeUrl={activeUrl}
        >
            <ListItemIcon>
                <Symbol icon={icon} />
            </ListItemIcon>
            <Directory.Text primary={subject} />
        </Directory.Link>
    );
}

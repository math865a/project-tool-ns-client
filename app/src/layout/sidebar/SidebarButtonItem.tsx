import { ListItemIcon } from "@mui/material";
import { Directory, IconDef, Symbol } from "~/src/design-system";

export interface ISidebarButtonItem {
    icon: IconDef;
    subject: string;
    space?: boolean;
    onClick: () => void;
}

export default function SidebarButtonItem({
    onClick,
    icon,
    subject,

    space = false,
}: ISidebarButtonItem) {
    return (
        <Directory.Button onClick={onClick} sx={{ mb: space ? 3 : 0.5 }}>
            <ListItemIcon>
                <Symbol icon={icon} />
            </ListItemIcon>
            <Directory.Text primary={subject} />
        </Directory.Button>
    );
}

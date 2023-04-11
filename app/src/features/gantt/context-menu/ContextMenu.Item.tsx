import { MenuItemProps, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import { IconDef, Symbol } from "~/src/design-system";

export type IContextMenuItemProps = { onClick?: MenuItemProps['onClick'] } & {
    icon?: IconDef;
    label: string;
    disabled?: boolean;
    divider?: boolean;
};

export const ContextMenuItem = observer((props: IContextMenuItemProps) => {
    return (
        <MenuItem
            disabled={props.disabled ?? false}
            divider={props.divider ?? false}
            onClick={props.onClick}
            sx={{ py: 1 }}
        >
            <ListItemIcon>
                {props.icon && <Symbol icon={props.icon} />}
            </ListItemIcon>
            <ListItemText
                primary={props.label}
                primaryTypographyProps={{
                    fontSize: 12,
                }}
            />
        </MenuItem>
    );
});
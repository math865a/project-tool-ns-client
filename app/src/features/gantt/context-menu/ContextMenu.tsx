import {
    faBarsProgress,
    faMapPin,
    faSearch,
    faTrash,
    faUserPlus
} from "@fortawesome/pro-light-svg-icons";
import {
    Menu
} from "@mui/material";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { ContextMenuColorPickerItem } from "./ContextMenu.ColorPickerItem";
import { ContextMenuItem, IContextMenuItemProps } from "./ContextMenu.Item";

export const GanttContextMenu = observer(() => {
    const {
        Gantt: { Table: T },
    } = useWorkpackage();

    const items = computed(() => {
        const props: (IContextMenuItemProps & { name: string })[] = [
            {
                name: "details",
                label: "Detaljer",
                icon: faSearch,
            },
            {
                name: "createDelivery",
                label: "Tilføj leverance",
                icon: faMapPin,
                onClick: () => T.ContextMenu.createDelivery(),
            },
            {
                name: "createTask",
                label: "Tilføj opgave",
                icon: faBarsProgress,
                onClick: () => T.ContextMenu.createTask(),
            },
            {
                name: "delete",
                label: "Slet",
                icon: faTrash,
                onClick: () => T.ContextMenu.delete(),
            },
        ];
        return props.filter((d) =>
            T.Commands.availableCommands.includes(d.name)
        );
    });

    return (
        <Menu
            open={T.ContextMenu.isOpen}
            anchorReference="anchorPosition"
            anchorPosition={T.ContextMenu.Position?.anchorPosition}
            onClose={T.ContextMenu.handleClose}
            PaperProps={{
                sx: {
                    minWidth: 200,
                    width: 200,
                    backgroundColor: "#fff",
                    borderRadius: 3,
                },
            }}
        >
            {items.get().map((item) => (
                <ContextMenuItem key={item.name} {...item} />
            ))}
            {T.Commands.commands.changeColor &&
                T.ContextMenu.Activity &&
                T.ContextMenu.Activity.kind === "Delivery" && (
                    <ContextMenuColorPickerItem
                        Activity={T.ContextMenu.Activity}
                    />
                )}
        </Menu>
    );
});



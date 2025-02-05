import {
    Box,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { Activity } from "gantt-models";
import { ColorPickerOption, Symbol } from "~/src/design-system";
import ColorPickerMenu from "~/src/design-system/controls/color-picker/color-picker-menu";
import { useWorkpackage } from "~/src/state";
import { IconChevronRight } from "@tabler/icons-react";

export const ContextMenuColorPickerItem = observer(
    ({ Activity }: { Activity: Activity }) => {
        const {
            Gantt: {
                Table: { ContextMenu: C },
            },
        } = useWorkpackage();
        const M = C.ColorMenu;

        const ref = useRef<HTMLLIElement>(null);

        const handleChange = (color: string) => {
            Activity.updateColor(color);
        };

        return (
            <>
                <MenuItem
                    sx={{ py: 1 }}
                    ref={ref}
                    onClick={() => M.handleOpen()}
                >
                    <ListItemIcon>
                        <Box ml={-0.25}>
                            <ColorPickerOption
                                color={Activity.fill}
                                size={18}
                                spacing={0}
                                borderRadius="50%"
                            />
                        </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary="Farve"
                        primaryTypographyProps={{
                            fontSize: 12,
                        }}
                    />
                    <ListItemSecondaryAction>
                        <Symbol icon={IconChevronRight} />
                    </ListItemSecondaryAction>
                </MenuItem>

                <ColorPickerMenu
                    open={M.open}
                    anchorEl={ref.current}
                    onClose={M.handleClose}
                    color={Activity.fill}
                    onChange={handleChange}
                    transformOrigin={{ vertical: "bottom", horizontal: "left" }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    borderRadius="50%"
                />
            </>
        );
    }
);

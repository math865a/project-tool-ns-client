import { faChevronRight } from "@fortawesome/pro-light-svg-icons";
import {
    MenuItem,
    ListItemIcon,
    Box,
    ListItemText,
    ListItemSecondaryAction,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { Activity } from "gantt-models";
import { ColorPickerOption, Symbol } from "~/src/design-system";
import ColorPickerMenu from "~/src/design-system/controls/color-picker/color-picker-menu";
import { useWorkpackage } from "~/src/state";

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
            Activity.updateColor = color;
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
                                color={Activity.Style.fill}
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
                        <Symbol icon={faChevronRight} />
                    </ListItemSecondaryAction>
                </MenuItem>

                <ColorPickerMenu
                    open={M.open}
                    anchorEl={ref.current}
                    onClose={M.handleClose}
                    color={Activity.Style.fill}
                    onChange={handleChange}
                    transformOrigin={{ vertical: "bottom", horizontal: "left" }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    borderRadius="50%"
                />
            </>
        );
    }
);

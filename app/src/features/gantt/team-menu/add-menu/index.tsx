import { Menu, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action as A, Subject } from "~/src/_definitions";
import { Action } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { Can } from "~/src/session-user";

import { TeamPicker } from "./TeamPicker";
import { useTeamOptions } from "./useTeamOptions";
import { IconPlus } from "@tabler/icons-react";

const AddTeamMembersMenu = observer(() => {
    const { handleOpen, ...menuProps } = useMenuState();

    const { options, isLoading } = useTeamOptions(menuProps.open);

    const theme = useTheme();

    return (
        <>
            <Can I={A.Write} a={Subject.Workpackages}>
                <Action.TextButton
                    text="Tilføj"
                    icon={IconPlus}
                    symbolProps={{ color: theme.palette.success.main }}
                    onClick={handleOpen}
                />
            </Can>

            <Menu
                {...menuProps}
                PaperProps={{
                    sx: {
                        p: 2,
                        pb: 1,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                        minWidth: 425,
                    },
                }}
            >
                <TeamPicker
                    options={options}
                    isLoading={isLoading}
                    handleClose={menuProps.onClose}
                />
            </Menu>
        </>
    );
});

export default AddTeamMembersMenu;

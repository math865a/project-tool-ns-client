import { ButtonBase } from "@mui/material";
import { Avatars } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { UserMenu, useSession } from "~/src/session-user";

export default function SessionUserMenu() {
    const { handleOpen, ...menuProps } = useMenuState();

    const { user } = useSession();

    return (
        <>
            <ButtonBase onClick={handleOpen} sx={{ borderRadius: "50%", p: 1 }}>
                <Avatars.Individual size={33} fontSize={14} subject={user} tooltip="Åben" tooltipPlacement="bottom"/>
            </ButtonBase>
            <UserMenu {...menuProps} />
        </>
    );
}

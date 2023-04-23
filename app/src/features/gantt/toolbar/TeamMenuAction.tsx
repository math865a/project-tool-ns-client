import { faUsers } from "@fortawesome/pro-light-svg-icons";
import { Badge, BadgeProps, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useGantt } from "useGantt";
import { Action } from "~/src/design-system";
import { TeamMenu } from "../team-menu";

export const TeamMenuAction = observer(() => {
    const { Store: {TeamStore} } = useGantt();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setAnchorEl((prev) => (prev ? null : event.currentTarget));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <CountBadge
                badgeContent={TeamStore.TeamMembers.length}
                color="primary"
            >
                <Action.TextButton
                    text="Team"
                    icon={faUsers}
                    onClick={handleOpen}
                />
            </CountBadge>
            <TeamMenu open={open} anchorEl={anchorEl} onClose={handleClose} />
        </>
    );
});

const CountBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 3,
        top: 5,
        padding: "0 4px",
        border: `2px solid ${theme.palette.background.paper}`,
        fontSize: 10,
    },
}));

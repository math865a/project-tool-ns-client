import { ListItem, ListItemAvatar, Stack } from "@mui/material";
import { TeamMember } from "gantt-models";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { Avatars, Notification } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import TeamMemberDelete from "../delete-dialog";
import { SwapMenu } from "../swap-menu";
import TeamMemberText from "./Text";

interface Props {
    TeamMember: TeamMember;
    divider: boolean;
}

const TeamMemberItem = observer(({ TeamMember, divider }: Props) => {
    const { handleOpen: handleOpenSwap, ...swapMenuProps } = useMenuState();

    const itemRef = useRef<HTMLLIElement>(null);

    return (
        <>
            <ListItem
                ref={itemRef}
                divider={divider}
                secondaryAction={
                    <Stack
                        direction="row"
            
                        alignItems="center"
                        sx={{ minWidth: "max-content" }}
                    >
                        {/*<Action.Symbol
                            icon={faRightLeft}
                            title="Byt ud"
                            onClick={(event) =>
                                handleOpenSwap(event, itemRef.current)
                            }
                            disabled={TeamMember.Assignments.length === 0 || TeamStore.TeamMembers.length === 1}
                        />*/}
                        <TeamMemberDelete TeamMember={TeamMember}/>

                    </Stack>
                }
                sx={{ pl: 1, py: 1 }}
            >
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatars.Individual
                        subject={TeamMember.resource}
                        size={27}
                        fontSize={13}
                    />
                </ListItemAvatar>

                <TeamMemberText TeamMember={TeamMember} />

                {TeamMember.notifications.length > 0 && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        pl={3}
                    >
                        {TeamMember.notifications.map((d) => (
                            <Notification {...d} key={d.text} />
                        ))}
                    </Stack>
                )}
            </ListItem>
            {swapMenuProps.open && (
                <SwapMenu {...swapMenuProps} TeamMember={TeamMember} />
            )}
            {/*<TeamMemberMenu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    TeamMember={TeamMember}
                />*/}
        </>
    );
});
export default TeamMemberItem;

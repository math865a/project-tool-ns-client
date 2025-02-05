import {
    Box,
    Fade,
    IconButton,
    Menu,
    Tooltip,
    Typography,
} from "@mui/material";
import { TeamMember } from "gantt-models";
import _ from "lodash";
import { action, computed } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useGantt } from "useGantt";
import { Action, Fallback, Symbol } from "~/src/design-system";
import AddTeamMembersMenu from "./add-menu";
import TeamMemberItem from "./item/Item";
import { IconInfoCircle, IconUsersMinus } from "@tabler/icons-react";

export const TeamMenu = observer(
    (props: {
        open: boolean;
        onClose: () => void;
        anchorEl: HTMLElement | null;
    }) => {
        const { TeamStore } = useGantt();

        const orderState = useLocalObservable(() => ({ order: 1 as 1 | -1 }));

        const updateOrder = action(() => {
            orderState.order = orderState.order === 1 ? -1 : 1;
        });

        const items = computed(() => {
            const orderedTeam = _.sortBy(
                TeamStore.TeamMembers,
                (d) => d.resource.name
            );
            if (orderState.order === 1) {
                return orderedTeam;
            } else {
                return _.reverse(orderedTeam);
            }
        });

        const content = computed(() => {
            if (items.get().length === 0) {
                return (
                    <Fallback.Empty
                        icon={IconUsersMinus}
                        height={100}
                        text="Dit team er tomt."
                        direction="column"
                    />
                );
            }
            return items
                .get()
                .map((d, index) => (
                    <TeamMemberItem
                        TeamMember={d as unknown as TeamMember}
                        key={d.resource.id}
                        divider={index !== items.get().length - 1}
                    />
                ));
        });

        return (
            <Menu
                TransitionComponent={Fade}
                {...props}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        backgroundColor: "#fff",
                        minWidth: 450,
                        px: 2,
                        pt: 1,
                    },
                }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Box
                    pb={1}
                    flexGrow={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>Team</Typography>
                    <AddTeamMembersMenu />
                </Box>
                {content.get()}
                <Box
                    pt={1}
                    flexGrow={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Tooltip
                        title="Teamet er den pulje af ressourcer, som du har til rådighed til at tildele til dine opgaver."
                        arrow
                        placement="top"
                    >
                        <IconButton
                            size="small"
                            disableFocusRipple
                            disableTouchRipple
                            sx={{ cursor: "default" }}
                        >
                            <Symbol icon={IconInfoCircle} size={0.9} />
                        </IconButton>
                    </Tooltip>
                    <Action.TextButton text="Luk" onClick={props.onClose} />
                </Box>
            </Menu>
        );
    }
);

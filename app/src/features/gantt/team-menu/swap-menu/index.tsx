import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import {
    Box,
    Checkbox,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { TeamMember } from "gantt-models";
import { computed } from "mobx";
import { getSnapshot } from "mobx-keystone";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useWorkpackage } from "useWorkpackage";
import { Action, Avatars, Symbol } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { TeamMemberJson } from "../../types";

export const SwapMenu = observer(
    ({
        TeamMember,
        ...menuProps
    }: Omit<ReturnType<typeof useMenuState>, "handleOpen"> & {
        TeamMember: TeamMember;
    }) => {
        const theme = useTheme();
        const {
            Gantt: { TeamStore },
            inform,
        } = useWorkpackage();

        const [value, setValue] = useState<TeamMemberJson | null>(null);

        const handleChange = (option: TeamMemberJson) =>
            setValue((prev) => (prev?.id === option?.id ? null : option));

        const options = computed<TeamMemberJson[]>(() => {
            return TeamStore.TeamMembers.filter((d) => d !== TeamMember).map(
                (d) => getSnapshot(d)
            );
        });

        const title = computed(() => {
            return `Byt ${TeamMember.resource.name} (${TeamMember.resourceType.name}) ud:`;
        });

        const handleSave = () => {
            if (value) {
                const result = TeamStore.swapTeamMember(
                    TeamMember.id,
                    value.id
                );
                if (result) {
                    inform("Resourcen er blevet byttet ud.", "success");
                    menuProps.onClose();
                    return;
                } else {
                    inform(
                        "Resourcen kunne ikke byttes ud. Prøv igen.",
                        "error"
                    );
                }
            }
            inform("Du skal vælge en ressource.", "error");
        };

        return (
            <Menu
                {...menuProps}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        backgroundColor: "#fff",
                        minWidth: 325,
                        px: 2,
                    },
                }}
            >
                <Box py={1}>
                    <Stack
                        direction="row"
                        display="flex"
                        alignItems="center"
                        flexGrow={1}
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <Typography
                            fontSize={12}
                            maxWidth={200}
                            lineHeight={1.25}
                        >
                            {title.get()}
                        </Typography>
                        <Tooltip
                            title="Når du bytter en ressource ud, vil alle allokeringer overføres samt den udbyttede ressource vil blive fjernet fra teamet."
                            arrow
                            placement="top"
                        >
                            <IconButton
                                size="small"
                                disableFocusRipple
                                disableTouchRipple
                                sx={{ cursor: "default" }}
                            >
                                <Symbol icon={faInfoCircle} size={0.9} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                {options.get().map((Option, index) => (
                    <ListItem
                        divider={index !== options.get().length - 1}
                        key={Option.id}
                    >
                        <ListItemAvatar sx={{ minWidth: 35 }}>
                            <Avatars.Individual
                                subject={Option.resource}
                                size={22}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={Option.resource.name}
                            secondary={Option.resourceType.name}
                            primaryTypographyProps={{ fontSize: 12 }}
                            secondaryTypographyProps={{ fontSize: 12 }}
                        />
                        <ListItemSecondaryAction>
                            <Checkbox
                                checked={value?.id === Option.id}
                                onChange={() => handleChange(Option)}
                                size="small"
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}

                <Box
                    flexGrow={1}
                    pt={1}
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Action.TextButton
                            fontSize={12}
                            text="Annuller"
                            icon={faTimes}
                            symbolProps={{ color: theme.palette.error.main }}
                            onClick={menuProps.onClose}
                        />
                        <Action.TextButton
                            fontSize={12}
                            text="Gem"
                            disabled={value === null}
                            icon={faCheck}
                            onClick={handleSave}
                            symbolProps={{ color: theme.palette.success.main }}
                        />
                    </Stack>
                </Box>
            </Menu>
        );
    }
);

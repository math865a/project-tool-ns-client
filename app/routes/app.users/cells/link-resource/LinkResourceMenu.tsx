import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { useFetcher } from "@remix-run/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IUserConnectOption } from "~/routes/app.users.create/form";
import { Action, Avatars, Fallback, Symbol } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { UserRow } from "../../definitions";

interface Props extends Omit<ReturnType<typeof useMenuState>, "handleOpen"> {
    user: UserRow;
    merge: (user: UserRow, connectId: string) => void;
    handleCloseMain: () => void;
}

export function LinkResourceMenu({
    user,
    merge,
    handleCloseMain,
    ...menuProps
}: Props) {
    const connectOptions = useFetcher<IUserConnectOption[]>();
    useEffect(() => {
        if (menuProps.open) {
            connectOptions.load(`/api/user/merge-options`);
        }
    }, [menuProps.open]);

    const [selected, setSelected] = useState<IUserConnectOption | null>(null);

    useEffect(() => {
        if (connectOptions.state === "idle" && connectOptions.data) {
            setSelected(
                _.find(connectOptions.data, (d) => d.name === user.name) ?? null
            );
        }
    }, [connectOptions.state, connectOptions.data, setSelected]);

    const handleSelect = (option: IUserConnectOption) => {
        setSelected(option);
    };

    const handleClose = () => {
        setSelected(null);
        menuProps.onClose();
    };

    const theme = useTheme();

    const handleSubmit = () => {
        if (selected) {
            merge(user, selected.id);
            handleClose();
            handleCloseMain();
        }
    };

    return (
        <Menu
            {...menuProps}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            PaperProps={{
                sx: {
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    overflowY: "hidden",
                },
            }}
        >
            <ListItem divider>
                <Box flexGrow={1} display="flex" justifyContent="space-between" px={1} pb={1}>
                    <Typography fontWeight="bold">Forbind ressource</Typography>
                    <Typography fontSize={12} color="text.secondary">{selected ? "1 valgt" : ""}</Typography>
                </Box>
            </ListItem>

            {connectOptions.state === "loading" || !connectOptions.data ? (
                <Fallback.SectionLoading />
            ) : (
                <List sx={{ maxHeight: 500, overflowY: "scroll", py: 0 }}>
                    {connectOptions.data.map((d) => (
                        <MenuItem onClick={() => handleSelect(d)} key={d.id} sx={{backgroundColor: theme => theme.palette.background.paper}}>
                            <ListItemAvatar>
                                <Avatars.Individual subject={d} size={25} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={d.name}
                                primaryTypographyProps={{ fontSize: 12 }}
                            />
                            <ListItemSecondaryAction>
                                {selected?.id === d.id ? (
                                    <Symbol
                                        icon={faCheck}
                                        color={theme.palette.success.main}
                                    />
                                ) : undefined}
                            </ListItemSecondaryAction>
                        </MenuItem>
                    ))}
                </List>
            )}
            <ListItem divider />
            <Box flexGrow={1} display="flex" justifyContent="flex-end" px={1} pt={1}>
                <Action.TextButton
                    text="Annuller"
                    icon={faTimes}
                    symbolProps={{ color: theme.palette.error.main }}
                    type="button"
                    onClick={handleClose}
                />
                <Action.TextButton
                    text="Bekræft"
                    icon={faCheck}
                    symbolProps={{ color: theme.palette.success.main }}
                    disabled={selected === null}
                    onClick={() => handleSubmit()}
                />
            </Box>
        </Menu>
    );
}

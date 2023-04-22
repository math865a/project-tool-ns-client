import {
    Autocomplete, AutocompleteCloseReason, Box, List,
    ListItem,
    ListItemAvatar, ListItemText,
    Menu, Typography
} from "@mui/material";
import { Action, AutoControl, Avatars, Fallback } from "design";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from 'useWorkpackage';

export const GanttAssignmentMenu = observer(() => {
    const { Gantt } = useWorkpackage()
    const T = Gantt.Table.AssignmentMenu
    return (
        <Menu
            open={T.open}
            anchorPosition={T.position?.anchorPosition}
            anchorReference="anchorPosition"
            PaperProps={{
                sx: {
                    p: 2,
                    pb: 1,
                    borderRadius: 4,
                    minWidth: 425,
                    backgroundColor: "#fff"
                },
            }}
            onClose={T.handleClose}
        >
            <div>
                <Autocomplete
                    open
                    value={T.Activity?.Team ?? []}
                    options={_.sortBy(Gantt.Store.TeamStore.TeamMembers, (d) =>
                        T.Selected.includes(d) ? 1 : 2
                    )}
                    groupBy={(option) =>
                        T.Selected.includes(option) ? "a" : "b"
                    }
                    onChange={(event, value, reason, details) =>
                        T.handleChange(event, value, reason, details)
                    }
                    multiple
                    onClose={(
                        event: React.ChangeEvent<{}>,
                        reason: AutocompleteCloseReason
                    ) => {
                        if (reason === "escape") {
                            T.handleClose();
                        }
                    }}
                    disableCloseOnSelect
                    PopperComponent={AutoControl.Popper}
                    renderTags={() => null}
                    noOptionsText={<Fallback.Empty  bold height={100} text="Der er ingen ressource på dit team" subText="Tilføj ressourcer øverst på siden."/>}
                    renderGroup={(params) =>
                        (
                            <List
                            >
                                <ListItem
                                    sx={{
                                        px: 0,
                                        pb: 0.5,
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            params.group === "a"
                                                ? "Valgte"
                                                : "Tilgængelige"
                                        }
                                        primaryTypographyProps={{
                                            fontSize: 12,
                                        }}
                                    />
                                    <Typography></Typography>
                                </ListItem>
                                {params.children}
                            </List>
                        )
                    }
                    renderOption={(props, option, state) => (
                        <AutoControl.Option
                            props={props}
                            disableCheck
                            option={option}
                            state={state}
                            sx={{ py: 0, alignItems: "center" }}
                        >
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <Avatars.Individual
                                    subject={option.Resource}
                                    size={25}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={option.Resource.name}
                                secondary={option.ResourceType.name}
                                primaryTypographyProps={{ fontSize: 12 }}
                                secondaryTypographyProps={{ fontSize: 12 }}
                            />
                        </AutoControl.Option>
                    )}
                    renderInput={(params) => (
                        <AutoControl.Header title="Tildelte ressourcer" {...params} />
                    )}
                    getOptionLabel={(option) => option.Resource.name}
                />
            </div>
            <Box flexGrow={1} display="flex" justifyContent="flex-end" py={1}>
                <Action.TextButton text="Luk" onClick={() => T.handleClose()} />
            </Box>
        </Menu>
    );
});

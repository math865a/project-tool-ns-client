import { TeamMemberJson } from "gantt/types";
import {
    Autocomplete,
    AutocompleteCloseReason, ListItemAvatar,
    ListItemText
} from "@mui/material";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AutoControl, Avatars, Fallback } from "~/src/design-system";
import { useWorkpackage } from "useWorkpackage";
import AddMenuActions from "./AddMenuActions";

export const TeamPicker = observer(
    ({
        options,
        isLoading,
        handleClose,
    }: {
        options: TeamMemberJson[];
        isLoading: boolean;
        handleClose: () => void;
    }) => {
        const [selected, setSelected] = useState<TeamMemberJson[]>([]);

        const {Gantt: {TeamStore}, inform} = useWorkpackage()

        const handleChange = (values: TeamMemberJson[]) => {
            setSelected(values);
        };

        const handleCancel = () => {
            handleClose();
            setSelected([]);
        };

        const handleConfirm = () => {
            selected.forEach((d) => TeamStore.addTeamMember(d));
            inform("Teamet blev opdateret.", "success")
            handleCancel();
        };


        return (
            <>
                <div>
                    <Autocomplete
                        onKeyDown={(event) => event.stopPropagation()}
                        open
                        multiple
                        loading={isLoading}
                        loadingText={<Fallback.SectionLoading text="Indlæser ressourcer"/>}
                        onClose={(
                            event: React.ChangeEvent<{}>,
                            reason: AutocompleteCloseReason
                        ) => {
                            if (reason === "escape") {
                                handleCancel();
                            }
                        }}
                        value={selected}
                        onChange={(event, newValue, reason, details) =>
                            handleChange(newValue)
                        }
                        renderOption={(props, option, state) => (
                            <AutoControl.Option
                                props={props}
                                option={option}
                                state={state}
                                sx={{ py: 0, alignItems: "center" }}
                            >
                                <ListItemAvatar sx={{ minWidth: 40 }}>
                                    <Avatars.Individual
                                        subject={option.resource}
                                        size={25}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={option.resource.name}
                                    secondary={option.resourceType.name}
                                    primaryTypographyProps={{ fontSize: 12 }}
                                    secondaryTypographyProps={{ fontSize: 12 }}
                                />
                            </AutoControl.Option>
                        )}
                        options={_.filter(
                            options,
                            (d) =>
                                TeamStore.TeamMembers.find(
                                    (x) => x.id === d.id
                                ) === undefined
                        )}
                        disableCloseOnSelect
                        PopperComponent={AutoControl.Popper}
                        renderTags={() => null}
                        noOptionsText="Der er ingen ressourcer som ikke allerede er på dit team."
                        getOptionLabel={(option) => option.resource.name}
                        sx={{
                            "& .MuiList-Root": {
                                width: 400,
                            },
                        }}
                        renderInput={(params) => (
                            <AutoControl.Header title="Tilføj ressourcer" {...params} />
                        )}
                    />
                </div>
                <AddMenuActions
                    selected={selected}
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel}
                />
            </>
        );
    }
);

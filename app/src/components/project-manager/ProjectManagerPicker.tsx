import {
    Autocomplete,
    autocompleteClasses,
    AutocompleteCloseReason,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    styled,
} from "@mui/material";
import { AutoControl, Avatars, Fallback, Symbol } from "~/src/design-system";
import { useProjectManagerMenu } from "./ProjectManagerMenuProvider";
import { IconCheck } from "@tabler/icons-react";

export default function ProjectManagerPicker() {
    const {
        options,
        isLoadingOptions,
        handleClose,
        projectManager,
        updateProjectManager,
        title,
    } = useProjectManagerMenu();

    return (
        <div>
            <Autocomplete
                open
                multiple
                loading={isLoadingOptions}
                loadingText={<Fallback.SectionLoading />}
                onClose={(
                    event: React.ChangeEvent<{}>,
                    reason: AutocompleteCloseReason
                ) => {
                    if (reason === "escape") {
                        handleClose();
                    }
                }}
                value={[projectManager]}
                onChange={(event, newValue, reason, details) => {
                    const newVal = details?.option;
                    updateProjectManager(newVal ?? null);
                }}
                renderOption={(props, option, state) => {
                    if (option.name === "Ingen") return null;
                    return (
                        <AutoControl.Option
                            key={option.id}
                            props={props}
                            option={option}
                            state={state}
                            sx={{ py: 2 }}
                        >
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <Avatars.Individual
                                    subject={option}
                                    size={25}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={option.name}
                                primaryTypographyProps={{ fontSize: 13 }}
                                secondaryTypographyProps={{ fontSize: 13 }}
                            />
                            <ListItemSecondaryAction>
                                {state.selected && <Symbol icon={IconCheck} />}
                            </ListItemSecondaryAction>
                        </AutoControl.Option>
                    );
                }}
                options={options}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disableCloseOnSelect
                PopperComponent={AutocompletePopper}
                renderTags={() => null}
                noOptionsText="Der er ingen ressourcer som ikke allerede er på dit team."
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <AutoControl.Header title={title} {...params} />
                )}
            />
        </div>
    );
}

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;
    open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: "none",
        margin: 0,
        padding: "none",
        color: "inherit",
        fontSize: 13,
        width: 320,
        backgroundColor: "#fff",
    },

    [`& .${autocompleteClasses.listbox}`]: {
        flexGrow: 1,
        width: 300,
        "::-webkit-scrollbar": {
            display: "none",
        },

        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            alignItems: "center",
            padding: 8,
            paddingTop: 6,
            paddingBottom: 6,
            backgroundColor: "inherit",
            borderBottom: `1px solid  ${
                theme.palette.mode === "light" ? " #eaecef" : "#30363d"
            }`,
            '&[aria-selected="true"]': {
                backgroundColor: "transparent",
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: "relative",
    },
}));

export function AutocompletePopper(props: PopperComponentProps) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

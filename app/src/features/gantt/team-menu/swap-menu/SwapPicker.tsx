import { TeamMemberJson } from "gantt/types";
import {
    Autocomplete,
    autocompleteClasses,
    AutocompleteCloseReason,
    InputBase,
    ListItemAvatar,
    ListItemText,
    styled,
} from "@mui/material";
import { AutoControl, Avatars } from "~/src/design-system";

interface Props {
    value: TeamMemberJson;
    onClose: () => void;
    options: TeamMemberJson[];
    handleChange: (value: TeamMemberJson) => void;
    title: string;
}

export default function SwapPicker({
    value,
    onClose,
    options,
    handleChange,
    title,
}: Props) {
    return (
        <div style={{ width: "100%" }}>
            <Autocomplete
                open
                onClose={(
                    event: React.ChangeEvent<{}>,
                    reason: AutocompleteCloseReason
                ) => {
                    if (reason === "escape") {
                        onClose();
                    }
                }}
                value={value}
                onChange={(event, newValue, reason, details) =>
                    newValue && handleChange(newValue)
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
                options={options}
                disableCloseOnSelect
                PopperComponent={AutocompletePopper}
                renderTags={() => null}
                noOptionsText="Der er ingen ressourcer som ikke allerede er på dit team."
                getOptionLabel={(option) => option.resource.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{
                    "& .MuiList-Root": {
                        width: 530,
                    },
                    "& .MuiPaper-Root": {
                        width: "100%",
                    },
                }}
                renderInput={(params) => (
               
                    <AutoControl.Header title={title} asValue {...params} />
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
        color: "inherit",
        fontSize: 13,
        width: 300,
        backgroundColor: "#fff",
    },
    [`& .${autocompleteClasses.listbox}`]: {
        width: 300,
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            alignItems: "center",
            padding: 8,
            paddingTop: 4,
            paddingBottom: 4,
            borderBottom: `1px solid  ${
                theme.palette.mode === "light" ? " #eaecef" : "#30363d"
            }`,
            '&[aria-selected="true"]': {
                backgroundColor: "transparent",
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
                {
                    backgroundColor: theme.palette.action.hover,
                },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: "relative",
    },
}));

function AutocompletePopper(props: PopperComponentProps) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

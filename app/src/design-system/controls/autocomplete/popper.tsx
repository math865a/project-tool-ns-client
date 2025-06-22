import { autocompleteClasses, styled } from "@mui/material";

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
        width: 400,
        backgroundColor: "#fff",
    },

    [`& .${autocompleteClasses.listbox}`]: {
        width: 400,
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

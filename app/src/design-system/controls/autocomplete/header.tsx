import {
    AutocompleteRenderInputParams,
    Box,
    InputAdornment,
    InputBase,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Symbol } from "../../symbol";
import { IconSearch } from "@tabler/icons-react";

function Header({
    title,
    asValue = false,
    ...params
}: {
    title?: string;
    asValue?: boolean;
} & AutocompleteRenderInputParams) {
    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={2}
            sx={{ overflowX: "hidden" }}
        >
            <Typography fontWeight="bold" fontSize={13} pr={3}>
                {title}
            </Typography>
            <Box maxWidth={225} flexGrow={1} pl={2}>
                <InputBase
                    fullWidth
                    autoFocus
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[200],
                        border: "none",
                        borderRadius: 2,
                    }}
                    ref={params.InputProps.ref}
                    startAdornment={
                        <InputAdornment position="start" sx={{ ml: 1.5 }}>
                            <Symbol icon={IconSearch} />
                        </InputAdornment>
                    }
                    inputProps={{
                        ...params.inputProps,
                        style: {
                            padding: "5.5px 5px",
                            fontSize: "12px",
                        },
                    }}
                    placeholder="Søg..."
                />
            </Box>
        </Box>
    );
}

export const AutocompleteHeader = observer(Header);

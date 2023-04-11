import { Box, ListItem, Typography } from "@mui/material";

export function NoFavorites() {
    return (
        <ListItem>
            <Box
                height={100}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                p={2}

            >
                <Typography>Du har ingen favoritter</Typography>
            </Box>
        </ListItem>
    );
}

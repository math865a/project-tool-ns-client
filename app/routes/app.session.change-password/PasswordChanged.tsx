import { faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { Box, Typography, useTheme } from "@mui/material";
import { Symbol } from "~/src/design-system";

export default function PasswordChanged() {
    const theme = useTheme();
    return (
        <Box
            display="flex"
            flexGrow={1}
            height="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            py={3}
        >
            <Symbol
                icon={faThumbsUp}
                size={4}
                color={theme.palette.text.secondary}
            />
            <Typography
                pt={2}
                fontWeight="bold"
                fontSize={18}
                maxWidth="60%"
                flexWrap="wrap"
                color="text.secondary"
            >
                Dit password er blevet ændret.
            </Typography>
        </Box>
    );
}

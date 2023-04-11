import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { HEADER_HEIGHT } from "../../_config/contants";
import { RowFilter } from "../toolbar";

const IdentityHeader = observer(() => {
    return (
        <Box
            flexGrow={1}
            height={HEADER_HEIGHT}
            display="flex"
            alignItems="center"
        >
            <Typography>Ressourcer</Typography>

            <RowFilter />
        </Box>
    );
});

export default IdentityHeader;

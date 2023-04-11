import { Box, Typography } from "@mui/material";
import { Avatars } from "~/src/design-system";
import { IProjectManagerRow } from "./types";

export function IdentityCell({ row }: { row: IProjectManagerRow }) {
    return (
        <Box display="flex" alignItems="center" px={1}>
            <Avatars.Individual size={25} subject={row} />
            <Typography
                pl={2}
                variant="body1"
                color="rgba(0,0,0,0.87)"
                sx={{
                    textRendering: "optimizeLegibility"
                }}
            >
                {row.name}
            </Typography>
        </Box>
    );
}

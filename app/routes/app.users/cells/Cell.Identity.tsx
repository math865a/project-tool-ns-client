import { faUser } from "@fortawesome/pro-light-svg-icons";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { Symbol } from "~/src/design-system";
import { UserRow } from "../definitions";


export function IdentityCell({ node }: { node: UserRow }) {
    return (
        <Box display="flex" alignItems="center" px={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                    variant="body1"
                    color="rgba(0,0,0,0.87)"
                    sx={{
                        textRendering: "optimizeLegibility",
                    }}
                >
                    {node.name}
                </Typography>
                {node.isSessionUser && (
                    <Tooltip title="Mig">
                        <Box>
                            <Symbol icon={faUser} size={1}/>
                        </Box>
                    </Tooltip>
                )}
            </Stack>
        </Box>
    );
}

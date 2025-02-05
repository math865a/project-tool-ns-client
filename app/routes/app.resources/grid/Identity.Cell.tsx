import { Box, Typography } from "@mui/material";
import { Avatars } from "~/src/design-system";
import { ResourceNode } from "~/src";

export function IdentityCell({ node }: { node: ResourceNode }) {
    return (
        <Box display="flex" alignItems="center" px={1}>
            <Avatars.Individual size={25} subject={node} />
            <Typography
                pl={2}
                variant="body1"
                color="rgba(0,0,0,0.87)"
                sx={{
                    textRendering: "optimizeLegibility",
                }}
            >
                {node.name}
            </Typography>
        </Box>
    );
}

import { faBusinessTime } from "@fortawesome/pro-light-svg-icons";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { Symbol } from "design";

export function WorkStat({ work }: { work: number }) {
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Arbejdstimer">
                <Box>
                    <Symbol icon={faBusinessTime} size={0.8} />
                </Box>
            </Tooltip>
            <Typography fontSize={11}>{`${work}t`}</Typography>
        </Stack>
    );
}

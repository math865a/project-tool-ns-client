import { faCoins } from "@fortawesome/pro-light-svg-icons";
import { formatThousands } from "~/util";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { Symbol } from "design";

export function ProfitCoverageStat({
    profit,
    coverage,
}: {
    profit: number;
    coverage: number;
}) {
    return (
        <Stack direction="row" alignItems="center" spacing={0.75}>
            <Tooltip title="Dækning & dækningsgrad">
                <Box>
                    <Symbol icon={faCoins} size={0.8} />
                </Box>
            </Tooltip>
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography fontSize={11}>{formatThousands(profit)}</Typography>
                <Typography fontSize={11} color="text.secondary">
                    {"(" + coverage + "%)"}
                </Typography>
            </Stack>
        </Stack>
    );
}

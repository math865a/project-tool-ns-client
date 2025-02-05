import { compressAmount } from "~/util";
import { Box, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Symbol } from "design";
import { IconArrowDown } from "@tabler/icons-react";

export function CostStat({ cost }: { cost: number }) {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Omkostninger">
                <Box>
                    <Symbol
                        icon={IconArrowDown}
                        color={theme.palette.error.main}
                        size={0.8}
                    />
                </Box>
            </Tooltip>
            <Typography fontSize={11}>{compressAmount(cost)}</Typography>
        </Stack>
    );
}

import { faArrowUp } from "@fortawesome/pro-light-svg-icons";
import { compressAmount } from "~/util";
import { Box, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Symbol } from "design";
export function SalesStat({ sales }: { sales: number }) {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Salg">
                <Box>
                    <Symbol
                        icon={faArrowUp}
                        color={theme.palette.success.main}
                        size={0.8}
                    />
                </Box>
            </Tooltip>
            <Typography fontSize={11}>{compressAmount(sales)}</Typography>
        </Stack>
    );
}

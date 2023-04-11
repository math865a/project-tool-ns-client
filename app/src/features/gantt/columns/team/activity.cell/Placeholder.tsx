import { Typography } from "@mui/material";

export function Placeholder({ allowed }: { allowed: boolean }) {
    if (!allowed) return null;
    return (
        <Typography fontSize={12} color="text.secondary">
            Tilføj
        </Typography>
    );
}

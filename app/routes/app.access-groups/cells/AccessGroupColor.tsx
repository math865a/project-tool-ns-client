import { Box } from "@mui/material";

export default function AccessGroupColor({ color }: { color: string }) {
    return (
        <Box
            width={20}
            height={20}
            borderRadius="25%"
            sx={{
                backgroundColor: color,
            }}
        />
    );
}

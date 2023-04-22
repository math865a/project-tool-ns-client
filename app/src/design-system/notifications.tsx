import { Box, Chip, Tooltip } from "@mui/material";

export interface INotification {
    type: "warning" | "error" | "info";
    text: string;
    explanation?: string;
    fontSize?: number
}

export function Notification({ explanation, ...rest }: INotification) {
    if (explanation) {
        return (
            <Tooltip title={explanation}>
                <Box>
                    <NotificationChip {...rest} />
                </Box>
            </Tooltip>
        );
    }

    return <NotificationChip {...rest} />;
}

function NotificationChip({ type, text, clickable, fontSize = 11 }: Omit<INotification, "explanation"> & {clickable?: boolean}) {
    return (
        <Chip
            color={type}
            label={text}
            size="small"
            clickable
            sx={{cursor: clickable ? "pointer" : "default", fontSize: fontSize, borderRadius: 2 }}
        />
    );
}

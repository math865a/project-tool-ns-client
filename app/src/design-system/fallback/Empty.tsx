import { Box, Stack, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { IconDef, Symbol, SymbolProps } from "../symbol";
interface Props {
    height?: number;
    direction?: CSSProperties["flexDirection"];
    text?: string;
    subText?: string;
    icon?: IconDef;
    symbolProps?: SymbolProps;
    textSize?: number;
    subTextSize?: number;
    spacing?: number;
    bold?: boolean;
}

export default function Empty({
    height = 200,
    direction = "row",
    text = "Der er intet data at vise.",
    subText,
    icon,
    symbolProps,
    textSize = 14,
    subTextSize = 12,
    spacing = icon ? 3 : 0,
    bold = false,
}: Props) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={direction}
            height={height}
            minHeight={height}
            flexGrow={1}
        >
            {icon && <Symbol icon={icon} size={3} {...symbolProps} />}
            <Stack pt={spacing}>
                <Typography
                    fontSize={textSize}
                    fontWeight={bold ? "bold" : undefined}
                >
                    {text}
                </Typography>
                {subText && (
                    <Typography fontSize={subTextSize} color="text.secondary">
                        {subText}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

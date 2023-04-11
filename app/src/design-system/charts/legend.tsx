import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export interface ILegendProps {
    color?: string;
    title: string;
    subtitle?: string;
    subtitleFontSize?: number;
    subtitleTextColor?: string;
    titleSpacing?: number;
    r?: number;
    variant?: LegendVariant;
    fontSize?: number;
    textColor?: string;
    spacing?: number
}

export type LegendVariant = "dot" | "line" | "square"

const useDimensions = (r: number, variant: LegendVariant) => {
    const dim = useMemo(() => {
        if (variant === "dot") {
            return {
                width: 2 * r,
                height: 2 * r,
            };
        } else if (variant === "square"){
            return {
                width: 2*r,
                height: 1.8*r
            }
        }
        return {
            width: r,
            height: 2,
        };
    }, [variant, r]);
    return dim
}

export function Legend({
    color = "transparent",
    title,
    subtitle,
    variant = "dot",
    r = variant === "dot" || variant === "square" ?  7 : 12,
    fontSize=11,
    textColor="text.primary",
    spacing=1,
    subtitleTextColor="text.secondary",
    subtitleFontSize = fontSize,
    titleSpacing = -0.5
    
}: ILegendProps) {

    const dimensions = useDimensions(r, variant)


    return (
        <Stack direction="row" spacing={spacing} alignItems="center">
            <Box
                borderRadius={variant === "dot" ? "50%" : variant === "square" ? "20%" : undefined}
                sx={{ backgroundColor: color, ...dimensions }}
            />
            <Stack spacing={titleSpacing}>
                <Typography
                    fontSize={fontSize}
                    sx={{ color: textColor }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        fontSize={subtitleFontSize}
                        sx={{ color: subtitleTextColor }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
}

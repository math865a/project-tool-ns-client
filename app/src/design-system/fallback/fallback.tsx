import {
    Backdrop,
    Box,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import { IconDef, Symbol, SymbolProps } from "../symbol";
import { IconLock } from "@tabler/icons-react";

interface FullScreenLoadingProps {
    text?: string;
    isLoading: boolean;
}

function FullScreenLoading({ text, isLoading }: FullScreenLoadingProps) {
    return (
        <Backdrop
            open={isLoading}
            sx={{
                zIndex: 100000,
                flexDirection: "column",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
        >
            <CircularProgress
                sx={{ zIndex: 100000000, color: "#fff" }}
                size={75}
            />
            {text && (
                <Typography
                    sx={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                    pt={3}
                >
                    {text}
                </Typography>
            )}
        </Backdrop>
    );
}

function AccessDenied() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            height={"60vh"}
            flexDirection="column"
        >
            <Symbol icon={IconLock} size={10} />
            <Typography fontSize={22} fontWeight="bold" pt={3}>
                Du har ikke adgang til denne side.
            </Typography>
        </Box>
    );
}

interface ISectionLoadingProps {
    height?: number | string;
    text?: string;
    fontSize?: number;
    bold?: boolean;
}

function SectionLoading({
    height = 200,
    text = "Indlæser",
    fontSize = 13,
    bold = false,
}: ISectionLoadingProps) {
    return (
        <Box
            flexGrow={1}
            height={height}
            minHeight={height}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <CircularProgress />
            {text && (
                <Typography
                    pt={2}
                    fontSize={fontSize}
                    fontWeight={bold ? "bold" : undefined}
                >
                    {text}
                </Typography>
            )}
        </Box>
    );
}

interface Props {
    height?: number;
    direction?: React.CSSProperties["flexDirection"];
    text?: string;
    subText?: string;
    icon?: IconDef;
    symbolProps?: SymbolProps;
    textSize?: number;
    subTextSize?: number;
    spacing?: number;
    bold?: boolean;
    iconSize?: number;
    backgroundColor?: string;
}

export default function Empty({
    height = 200,
    direction = "row",
    text = "Der er intet data at vise.",
    subText,
    icon,
    iconSize = 2,
    symbolProps,
    textSize = 14,
    subTextSize = 13,
    spacing = icon ? 2 : 0,
    bold = false,
    backgroundColor = "inherit",
}: Props) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={direction}
            height={height}
            flexGrow={1}
            sx={{ backgroundColor }}
        >
            {icon && <Symbol icon={icon} size={iconSize} {...symbolProps} />}
            <Stack pt={spacing} spacing={1} alignItems="center">
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

export const Fallback = {
    FullScreenLoading,
    AccessDenied,
    SectionLoading,
    Empty,
};

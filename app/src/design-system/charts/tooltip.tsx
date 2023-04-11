import {
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography,
    Divider as MuiDivider,
    Box,
} from "@mui/material";
import {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useMemo,
} from "react";
import { Child } from "../types";
import { ILegendProps, Legend } from "./legend";
import { DateTime as dt, Interval as int } from "luxon";
import { TooltipProps } from "recharts";
import { formatDecimal } from "~/util/format";

interface IWrapperProps {
    title?: string;
    subtitle?: string;
    children?: Child | Child[];
    opacity?: number;
    spacing?: number;
    suffix?: string;
    valueWidth?: number;
    r?: number;
    hideSign?: boolean;
    maxWidth?: number
}

const TooltipContext = createContext<{
    suffix?: string;
    valueWidth: number;
    r?: number;
    hideSign?: boolean
}>({ suffix: "", valueWidth: 50 });

function Wrapper({
    title,
    subtitle,
    children,
    opacity = 1,
    spacing = 0.75,
    suffix,
    valueWidth = 50,
    hideSign,
    r,
    maxWidth
}: IWrapperProps) {
    return (
        <Card
            sx={{
                borderRadius: 3,
                width: "max-content",
                backgroundColor: `rgba(255,255,255,${opacity})`,
                px: 0,
                py: 0,
                minWidth: 150,
                maxWidth: maxWidth,
                zIndex: theme => theme.zIndex.tooltip
            }}
            elevation={14}
        >
            {(title || subtitle) && (
                <CardHeader
                    titleTypographyProps={{ fontSize: 13, maxWidth: maxWidth ? maxWidth - 32 : 150 }}
                    subheaderTypographyProps={{
                        fontSize: 12,
                        color: "text.secondary",
                    }}
                    title={title}
                    subheader={subtitle}
                    sx={{ pb: 1.5, pt: 1.5 }}
                />
            )}
            <TooltipContext.Provider value={{ suffix, valueWidth, hideSign, r }}>
                <CardContent sx={{ pt: 0, pb: 0 }}>
                    <Stack spacing={spacing}>{children}</Stack>
                </CardContent>
            </TooltipContext.Provider>
        </Card>
    );
}

interface IEntryProps extends ILegendProps {
    value?: string | number;
    wrapperSpacing?: number;
    bold?: boolean;
    underline?: boolean;
    suffix?: string;
    hideSign?: boolean
}

function Entry({
    value,
    wrapperSpacing = 2,
    bold = false,
    fontSize = 12,
    textColor = "text.secondary",
    underline,
    hideSign,
suffix,
    ...legendProps
}: IEntryProps) {
    const context = useContext(TooltipContext);

    const sign = useMemo(() => {
        if (typeof value === "number") {
            return value > 0 ? "+" : value < 0 ? "-" : "";
        }
        return "";
    }, [value]);

    const absoluteValue = useMemo(() => {
        if (typeof value === "number") {
            return formatDecimal(Math.abs(value));
        }
        return value;
    }, [value]);

    return (
        <Stack
            flexGrow={1}
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            spacing={wrapperSpacing}
        >
            <Legend
                {...{
                    ...legendProps,
                    r: legendProps.r ? legendProps.r : context.r,
                }}
                textColor={textColor}
                fontSize={fontSize}
            />
            <Box
                width={context.valueWidth}
                minWidth={context.valueWidth}
                maxWidth={context.valueWidth}
                display="flex"
                justifyContent="space-between"
            >
                <Box flexGrow={1} display="flex">
                    <Typography
                        width={10}
                        fontSize={fontSize}
                        sx={{ color: textColor }}
                    >
                        {hideSign ? "" : sign}
                    </Typography>

                    <Box
                    ml={0.25}
                        sx={{
                            borderBottom: (theme) =>
                                underline
                                    ? `1px solid rgba(0,0,0,0.4)`
                                    : undefined,
                        }}
                    >
                        <Typography
                            fontSize={fontSize}
                            letterSpacing={0.3}
                            fontWeight={bold ? "bold" : undefined}
                            sx={{
                                color: textColor,

                                fontVariant: "tabular-nums",
                            }}
                        >
                            {absoluteValue}
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    fontSize={fontSize}
                    width={"max-content"}
                    sx={{ color: textColor }}
                >
                    {suffix ?? context.suffix}
                </Typography>
            </Box>
        </Stack>
    );
}

const useWeekYearToDisplayDate = ({
    week,
    year,
    format = "dd/MM/yy",
    combiner = "til",
}: {
    week?: number;
    year?: number;
    format?: string;
    combiner?: string;
}) => {
    const weekYear = useMemo(() => {
        if (!week || !year) return "Uge ?";
        return `Uge ${week} ${year}`;
    }, [week, year]);

    const start = useMemo(() => {
        if (!week || !year) return null;
        return dt.fromObject({ weekNumber: week, weekYear: year });
    }, [week, year]);

    const end = useMemo(() => {
        if (!week || !year) return null;
        return dt
            .fromObject({ weekNumber: week, weekYear: year })
            .plus({ days: 6 });
    }, [week, year]);

    const interval = useMemo(() => {
        if (start && end) {
            return int.fromDateTimes(start, end);
        }
        return null;
    }, [start, end]);

    const startDisplay = useMemo(() => {
        if (start) {
            return start.toFormat(format);
        }
        return "?";
    }, [start, format]);

    const endDisplay = useMemo(() => {
        if (end) {
            return end.toFormat(format);
        }
        return "?";
    }, [end, format]);

    const displayInterval = useMemo(() => {
        return `${startDisplay} ${combiner} ${endDisplay}`;
    }, [start, combiner, end]);

    return {
        start,
        end,
        interval,
        startDisplay,
        endDisplay,
        displayInterval,
        weekYear,
    };
};

interface IData {
    [index: string]: any;
}

const useRechartsTooltipData = <T extends IData = IData>(
    payload: TooltipProps<any, any>["payload"]
): T | null => {
    const data = useMemo(() => {
        if (payload && payload.length) {
            return payload[0].payload as T;
        }
        return null;
    }, [payload]);

    return data;
};

function Divider() {
    return <MuiDivider flexItem />;
}

export const Tooltip = {
    Wrapper,
    Entry,
    useWeekYearToDisplayDate,
    useRechartsTooltipData,
    Divider,
};

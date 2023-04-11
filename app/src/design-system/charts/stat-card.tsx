import { getContrastColor } from "~/util";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { IconDef, Symbol } from "../symbol";
import { Child } from "../types";

interface StatCardProps {
    title: string;
    titleIcon?: IconDef;
    value: number | string | Object;
    secondaryValue?: string | number | Object;
    secondaryValueIcon?: IconDef;
    backgroundColor?: string;
    action?: Child | Child[];
    border?: boolean;
    showAction?: boolean;
    stretch?: boolean;
    align?: "flex-start" | "center" | "flex-end";
    px?: number;
    pb?: number;
    ptHeader?: number;
}

export function StatCard({
    title,
    titleIcon,
    value,
    secondaryValue,
    secondaryValueIcon,
    backgroundColor = "#FEFEFE",
    action,
    border = true,
    showAction,
    stretch,
    align = "center",
    px,
    pb,
    ptHeader = 3,
}: StatCardProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor,
                flexGrow: 1,
                borderColor: border ? undefined : "transparent",
                borderRadius: 4,
                px: 1,
                alignSelf: stretch ? "stretch" : undefined,
                height: stretch ? "100%" : undefined,
                pb,
            }}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <CardHeader
                title={title}
                titleTypographyProps={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "text.secondary",
                    fontFamily: "Inter",
                }}
                action={titleIcon && <Symbol icon={titleIcon} />}
                sx={{ pt: ptHeader, pb: 0 }}
            />
            <CardContent sx={{ px, pb }}>
                <Stack
                    direction="row"
                    alignItems={align}
                    justifyContent="space-between"
                    flexGrow={1}
                    sx={{ minHeight: 30 }}
                >
                    <>
                        {typeof value === "string" ||
                        typeof value === "number" ? (
                            <Typography
                                fontWeight="bold"
                                sx={{ color: "#1c1c1c" }}
                                fontSize={24}
                            >
                                {value}
                            </Typography>
                        ) : (
                            value
                        )}
                        {!secondaryValue ? (
                            <></>
                        ) : typeof secondaryValue === "object" ? (
                            secondaryValue
                        ) : (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                {secondaryValueIcon && (
                                    <Symbol
                                        color="#1c1c1c"
                                        icon={secondaryValueIcon}
                                    />
                                )}
                                <Typography sx={{ color: "#1c1c1c" }}>
                                    {secondaryValue}
                                </Typography>
                            </Stack>
                        )}

                        {action && (
                            <Box>{(showAction || isHovering) && action}</Box>
                        )}
                    </>
                </Stack>
            </CardContent>
        </Card>
    );
}

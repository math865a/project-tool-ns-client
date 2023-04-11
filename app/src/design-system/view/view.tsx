import {
    Box,
    Unstable_Grid2 as Grid,
    Card as MuiCard,
    TypographyProps,
    CardActionArea,
    CardHeader,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { Link } from "@remix-run/react";
import { useMemo, useState } from "react";
import { Child } from "../types";

interface WrapperProps {
    children?: Child | Child[];
    size?: "default" | "large"
}

function Wrapper({ children, size = "default" }: WrapperProps) {

    const columns = useMemo(() => {
        if (size === "default"){
            return { xs: 4, sm: 8, md: 12, xl: 16}
        }
        return { xs: 2, sm: 8, md: 8, xl: 12, xxl: 16}
    },[size])

    return (
        <Box flexGrow={1}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={columns}
            >
                {children}
            </Grid>
        </Box>
    );
}

interface CardProps {
    title: string;
    subtitle?: string;
    titleProps?: TypographyProps;
    subtitleProps?: TypographyProps;
    to: string;
    bodyHeight?: number;
}

function Card({
    title,
    subtitle,
    titleProps,
    subtitleProps,
    to,
    bodyHeight = 125,
}: CardProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <Grid xs={2} sm={4} md={4}>
            <MuiCard
                sx={{
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                raised={isHovering}
            >
                <CardActionArea component={Link} to={to}>
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: bodyHeight,
                        }}
                    >
                        <Stack>
                            <Typography
                                fontSize={16}
                                fontWeight="bold"
                                letterSpacing={0.65}
                                {...titleProps}
                            >
                                {title}
                            </Typography>
                            {subtitle && (
                                <Typography
                                    color="text.secondary"
                                    {...subtitleProps}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </MuiCard>
        </Grid>
    );
}

export const View = {
    Wrapper,
    Card,
};

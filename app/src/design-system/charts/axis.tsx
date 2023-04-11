import { useTheme } from "@mui/material";
import { XAxis, XAxisProps, YAxis, YAxisProps } from "recharts";

function X(props: XAxisProps) {
    const theme = useTheme();
    return (
        <XAxis
            fontFamily="Public Sans"
            dy={5}
            fontSize={12}
            fill={theme.palette.text.secondary}
            tickLine={{ strokeWidth: 0 }}
            axisLine={{ stroke: "transparent" }}
            {...props}
        />
    );
}

function Y(props: YAxisProps) {
    const theme = useTheme();
    return (
        <YAxis
            fontSize={12}
            fill={theme.palette.text.secondary}
            fontFamily="Public Sans"
            dx={-5}
            tickLine={{ strokeWidth: 0.5, stroke: "#CECECE" }}
            axisLine={{ stroke: "transparent" }}
            {...props}
        />
    );
}

export const Axis = {
    X,
    Y
};

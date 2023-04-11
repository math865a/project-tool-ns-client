import { Text } from "@visx/text";
import React from "react";
import { PieLabelRenderProps } from "recharts";
import { disableInteraction } from "~/styles";
import { getAvatarName } from "~/util";

const RADIAN = Math.PI / 180;
export const PieLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, name,
}: PieLabelRenderProps) => {
    const radius = (innerRadius as number) +
        ((outerRadius as number) - (innerRadius as number)) * 0.5;
    const x = (cx as number) + radius * Math.cos(-midAngle * RADIAN);
    const y = (cy as number) + radius * Math.sin(-midAngle * RADIAN);
    return (
        <Text
            x={x}
            y={y}
            fill="white"
            /*textAnchor={x > (cx as number) ? 'start' : 'end'}*/ textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            style={disableInteraction as React.CSSProperties}
        >
            {getAvatarName(name)}
        </Text>
    );
};

import { useTheme } from "@mui/material";
import { Text, TextProps } from "@visx/text";
import _ from "lodash";
import { DateTime as dt } from "luxon";
import { useMemo } from "react";

export default function PeriodLabel(props: any) {
    const { x, y } = props;

    const theme = useTheme();

    const baseStyles: TextProps = useMemo(
        () => ({
            x,
            y,
            fontFamily: "Poppins",
            verticalAnchor: "middle",
            fontSize: 12,
            textAnchor: "middle",
            color: theme.palette.text.secondary,
        }),
        [x, y]
    );

    const datetime = useMemo(
        () => dt.fromMillis(props.payload.value).setLocale("da"),
        [props.payload.value]
    );

    const weekDay = useMemo(
        () => _.capitalize(datetime.setZone("utc").toFormat("cccc")),
        [datetime]
    );
    const date = useMemo(
        () => datetime.setZone("utc").toFormat("dd/MM/yyyy"),
        [datetime]
    );

    return (
        <g transform="translate(0, -5)">
            <Text {...baseStyles}>{date}</Text>
            <Text {...baseStyles} dy={-17.5}>
                {weekDay}
            </Text>
        </g>
    );
}

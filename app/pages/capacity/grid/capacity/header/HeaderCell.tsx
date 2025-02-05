import { useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { HEADER_HEIGHT } from "../../../_config/contants";
import { useBoard } from "../../../_provider";
import { DateTime as dt, Duration as dur } from "luxon";
import { computed } from "mobx";

import { Text } from "@visx/text";
import { disableInteraction } from "~/styles";
import React from "react";
import _ from "lodash";
import { ICapacityInterval } from "~/pages/capacity/_controllers/view";
import { ViewMode } from "~/pages/capacity/_definitions";

const CapacityHeaderCell = observer(
    (props: { interval: ICapacityInterval }) => {
        const Board = useBoard();

        const text = computed(() => {
            if (Board.View.viewMode === ViewMode.Day) {
                const date =
                    props.interval.interval.start?.setLocale("da") ?? dt.now();
                let primary: string = "";
                let secondary: string = "";
                if (date.weekday === 1) {
                    primary = `Uge ${date.toFormat("W yyyy")} `;

                    secondary = `${date.toFormat("cccc d/M")}`;
                } else if (date.day === 1) {
                    primary = date.toFormat("MMMM yyyy");
                    secondary = `${date.toFormat("cccc d/M")}`;
                } else {
                    primary = date.toFormat("cccc d/M");
                }
                return {
                    primary: primary,
                    secondary: secondary,
                };
            } else if (Board.View.viewMode === ViewMode.Week) {
                const date =
                    props.interval.interval.start?.setLocale("da") ?? dt.now();
                const finishDate = date
                    .plus(dur.fromObject({ weeks: 1 }))
                    .minus({ days: 1 });
                let primary: string = "";
                let secondary: string = "";
                if (date.weekNumber % 8 === 0) {
                    secondary = `${date.toFormat("d.")}-${finishDate.toFormat(
                        "d. MMM"
                    )}`;
                    primary = `Uge ${date.toFormat("W")}`;
                } else if (date.month !== finishDate.month) {
                    secondary = `${date.toFormat("d.")}-${finishDate.toFormat(
                        "d. MMM"
                    )}`;
                    primary = finishDate.toFormat("MMMM yyyy");
                } else {
                    secondary = `${date.toFormat("d.")}-${finishDate.toFormat(
                        "d. MMM"
                    )}`;
                    primary = `Uge ${date.toFormat("W")}`;
                }
                return {
                    primary: primary,
                    secondary: secondary,
                };
            } else {
                const date =
                    props.interval.interval.start?.setLocale("da") ?? dt.now();

                let primary: string = "";
                let secondary: string = "";
                if (date.month === 1 || date.month === 6 || date.month === 12) {
                    primary = date.toFormat("MMMM yyyy");
                    //primary: `${date.daysInMonth} dage`,
                } else {
                    primary = date.toFormat("MMMM");
                    //primary: `${date.daysInMonth} dage`//`${date.toFormat("ccc. d")}-${finishDate.toFormat("ccc. d")}`
                }
                return {
                    primary: primary,
                    secondary: secondary,
                };
            }
        });

        const theme = useTheme();

        return (
            <g
                transform={`translate(${props.interval.x},0)`}
                width={props.interval.w}
                height={HEADER_HEIGHT}
            >
                {text.get().primary && (
                    <Text
                        style={disableInteraction as React.CSSProperties}
                        x={props.interval.w / 2}
                        y={
                            text.get().secondary
                                ? HEADER_HEIGHT / 5
                                : HEADER_HEIGHT / 2
                        }
                        fill={theme.palette.text.primary}
                        textAnchor="middle"
                        verticalAnchor="middle"
                        fontSize={text.get().secondary ? 12 : 13}
                        // fontWeight={550}
                    >
                        {_.capitalize(text.get().primary)}
                    </Text>
                )}

                {text.get().secondary && (
                    <Text
                        style={disableInteraction as React.CSSProperties}
                        x={props.interval.w / 2}
                        y={HEADER_HEIGHT / 1.66}
                        fill={theme.palette.text.secondary}
                        textAnchor="middle"
                        verticalAnchor="middle"
                        fontSize={12}
                        fontWeight={250}
                    >
                        {_.capitalize(text.get().secondary)}
                    </Text>
                )}
            </g>
        );
    }
);

export default CapacityHeaderCell;

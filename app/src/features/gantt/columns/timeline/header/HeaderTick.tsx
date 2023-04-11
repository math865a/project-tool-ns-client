import { useTheme } from "@mui/material";
import { TickRendererProps } from "@visx/axis";
import { Text } from "@visx/text";
import { HEADER_HEIGHT } from "gantt/constants";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { disableInteraction } from "~/styles";

export const HeaderTick = observer((props: TickRendererProps) => {
    const { Gantt } = useWorkpackage();

    const tick = computed(() => {
        return Gantt.TimelineIntervals.intervals.headerIntervals.find(
            (d) => d.primary === props.formattedValue
        );
    });

    const days = computed(() => {
        return tick.get()?.interval.toDuration("days").days ?? 0;
    });

    const width = computed(() => {
        return Gantt.Timeline.wDay * days.get();
    });

    const theme = useTheme();

    return (
        <g transform={`translate(${props.x},${-HEADER_HEIGHT / 2})`}>
            <g>
                <line
                    x1={0}
                    x2={0}
                    y1={-12}
                    y2={2}
                    stroke={theme.palette.divider}
                />
            </g>
            <g transform={`translate(${width.get() / 2},0)`}>
                <Text
                    fontFamily="Poppins"
                    textAnchor="middle"
                    verticalAnchor="middle"
                    style={disableInteraction as React.CSSProperties}
                    fill={theme.palette.text.primary}
                    fontWeight={tick.get()?.bold ? "bold" : 500}
                    fontSize={12}
                    width={width.get()}
                    lineHeight={"1rem"}
                >
                    {tick.get()?.primary}
                </Text>
            </g>
        </g>
    );
});

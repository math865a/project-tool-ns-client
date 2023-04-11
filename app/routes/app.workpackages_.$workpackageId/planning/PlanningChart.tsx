import { useElementSize } from "@mantine/hooks";
import { Box, useTheme } from "@mui/material";
import { AxisTop } from "@visx/axis";
import { GridColumns } from "@visx/grid";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWorkpackage } from "~/src/state";
import { DeliveryBar } from "./DeliveryBar";

const PlanningChart = observer(() => {
    const {
        Gantt: {
            Analysis: { PlanningChart: M },
        },
    } = useWorkpackage();

    const { ref, width } = useElementSize();

    useEffect(() => {
        if (width) {
            M.setWidth(width);
        }
    }, [width]);

    const theme = useTheme();
    return (
        <Box
            ref={ref}
            flexGrow={1}
            height={M.maxHeight}
            maxHeight={M.maxHeight}
            position="relative"
            sx={{ overflowY: "auto", overflowX: "hidden" }}
            mb={1}

            // onMouseMove={onMouseMove}
        >
            <svg
                width={M.width}
                height={M.height}
                style={{ position: "absolute", left: 0, top: 0 }}
            >
                <GridColumns
                    scale={M.xScale}
                    tickValues={_.uniq(
                        M.intervals.headerIntervals.map((d) => d.t)
                    )}
                    height={M.height}
                    width={M.width}
                    stroke="#1c1c1c"
                    strokeOpacity={0.25}
                    strokeDasharray="0 4 0"
                    top={M.top}
                />
                <AxisTop
                    scale={M.xScale}
                    tickValues={M.intervals.headerIntervals.map((d) => d.t)}
                    tickFormat={(d) => {
                        const tick = M.intervals.headerIntervals.find(
                            (x) => x.t === d
                        );
                        return tick?.primary ?? "";
                    }}
                    top={M.top}
                    left={0}
                    stroke="transparent" //{theme.palette.text.secondary}
                    tickLineProps={{ stroke: "transparent" }}
                    tickLabelProps={() => ({
                        fill: theme.palette.text.secondary,
                        fontSize: 11,
                        textAnchor: "middle",
                        verticalAnchor: "middle",
                    })}
                />
                <g>
                    <circle
                        r={5}
                        cx={M.xNow}
                        cy={M.top + 5}
                        fill={theme.palette.error.main}
                    />

                    <line
                        x1={M.xNow}
                        y1={M.top}
                        x2={M.xNow}
                        y2={M.height}
                        stroke={theme.palette.error.main}
                    />
                </g>
                <g transform={`translate(0, ${M.top})`}>
                    {M.data.map((d, index) => (
                        <DeliveryBar Delivery={d} key={d.id} />
                    ))}
                </g>
            </svg>
        </Box>
    );
});

export default PlanningChart;
/*                  <Line
                        from={{ x: M.xNow, y: M.top }}
                        to={{ x: M.xNow, y: M.height }}
                        stroke={theme.palette.error.main}
                    />*/

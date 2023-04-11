import { Box, useTheme } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { AxisTop } from "@visx/axis";
import { useEffect } from "react";
import { useScale } from "../provider/TimelineProvider";
import { HEADER_HEIGHT } from "../config/constants";
import { DateTime as dt } from "luxon";
import { disableInteraction } from  "~/styles";
import { useInitialTimelineWidth } from "../hooks/useInitialTimelineWidth";

export default function TimelineHeader() {
    const { timelineWidth, scale } = useScale();

    useInitialTimelineWidth()
    const theme = useTheme();

    return (
        <Box
            width={timelineWidth}
            height={HEADER_HEIGHT}
            position="relative"
            style={disableInteraction as React.CSSProperties}
        >
            <svg
                width={timelineWidth}
                height={HEADER_HEIGHT}
                style={{ position: "absolute", left: 0, top: 0 }}
            >
                <AxisTop
                    scale={scale}
                    top={HEADER_HEIGHT}
                    left={0}
                    stroke={"#c1c1c1"}
                    tickFormat={(d) =>
                        dt.fromMillis(d as number).toFormat("dd/MM/yy")
                    }
                    tickLabelProps={() => ({
                        fontSize: 12,
                        textAnchor: "middle",
                        verticalAnchor: "end",
                        dy: -8,
                        fontFamily: "Public Sans",
                        color: theme.palette.text.secondary,
                    })}
                    tickLength={7}
                />
            </svg>
        </Box>
    );
}

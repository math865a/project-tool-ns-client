import { disableInteraction } from  "~/styles";
import { Box, useTheme } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { AxisTop } from '@visx/axis';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { HEADER_HEIGHT } from '../controllers/_constants';
import { useTimeline } from '../task-timeline.provider';

const HeaderCalendar = observer(() => {
    const Controller = useTimeline();

    const api = useGridApiContext();
    useEffect(() => {
        Controller.Dimensions.setChartWidth(
            api.current.getColumn('timeline').computedWidth
        );
    }, []);

    const theme = useTheme()

    return (
        <Box
            width={Controller.Dimensions.chartWidth}
            height={HEADER_HEIGHT}
            position="relative"
            sx={disableInteraction}
        >
            <svg
                width={Controller.Dimensions.chartWidth}
                height={HEADER_HEIGHT}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    ...disableInteraction as React.CSSProperties,
                }}
            >
                <AxisTop
                    top={HEADER_HEIGHT}
                    left={0}
                    stroke="#000"
                    tickLineProps={{
                        stroke: "transparent"
                    }}
                    tickLength={8}
                    tickLabelProps={() => ({
                        fontSize: 12,
                        textAnchor: "middle",
                        fontFamily: "Public Sans",
                        fill : theme.palette.text.secondary
                    })}
                    scale={Controller.Dimensions.xScale}
                />
            </svg>
        </Box>
    );
});

export default HeaderCalendar;

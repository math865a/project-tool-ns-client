import { useTheme } from "@mui/material";
import { Text } from "@visx/text";
import { observer } from "mobx-react-lite";
import { ROW_HEIGHT } from "~/pages/capacity/_config/contants";
import { Capacity } from "~/pages/capacity/_models";
import { disableInteraction } from "~/styles";
import { useBoard } from "../../../_provider";

const CapacityCell = observer(({ Capacity }: { Capacity: Capacity }) => {
    const theme = useTheme();

    const Board = useBoard();

    if (!Capacity.Column) return null;
    return (
        <g
            transform={`translate(${Capacity.Column.x},0)`}
            height={ROW_HEIGHT}
            width={Capacity.Column.w}
        >
            <rect
                width={Capacity.Column.w}
                height={ROW_HEIGHT}
                fill={Capacity.Style.backgroundColor}
                onMouseEnter={() => Capacity.Style.setIsHovering(true)}
                onMouseLeave={() => Capacity.Style.setIsHovering(false)}
            />
            <Text
                x={Capacity.Column.w / 2}
                y={ROW_HEIGHT / 2}
                fontSize={12}
                fontFamily="Segoe UI"
                fill="#000"
                textAnchor="middle"
                verticalAnchor="middle"
                style={disableInteraction as React.CSSProperties}
            >
                {Capacity.Style.displayText}
            </Text>
            <line
                x1={Capacity.Column.w}
                y1={0}
                x2={Capacity.Column.w - -1}
                y={ROW_HEIGHT}
                strokeWidth={1}
                stroke={theme.palette.divider}
            />
        </g>
    );
});

export default CapacityCell;

/* <Line
                from={{
                    x: Capacity.Column.w,
                    y: 0,
                }}
                to={{
                    x: Capacity.Column.w - 1,
                    y: ROW_HEIGHT,
                }}
                strokeWidth={1}
                stroke={theme.palette.divider} />*/

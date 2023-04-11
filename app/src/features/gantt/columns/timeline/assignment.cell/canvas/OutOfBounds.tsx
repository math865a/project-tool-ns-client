import { PatternLines } from "@visx/pattern";
import { observer } from "mobx-react-lite";
import { AssignmentCanvas } from "gantt-models";
import { ROW_HEIGHT } from "gantt/constants";

export const OutOfBounds = observer(
    ({
        Canvas,
        rectProps = {},
    }: {
        Canvas: AssignmentCanvas;
        rectProps?: React.SVGProps<SVGRectElement>;
    }) => {
        return (
            <g>
                <PatternLines
                    id="closure1"
                    height={5}
                    width={5}
                    stroke={"#28282830"}
                    strokeWidth={1}
                    orientation={["diagonal"]}
                />
                <rect
                    x={Canvas.outOfBounds.start.x}
                    width={Canvas.outOfBounds.start.w}
                    height={ROW_HEIGHT}
                    fill="#fff"
                    {...rectProps}
                />
                <rect
                    x={Canvas.outOfBounds.start.x}
                    width={Canvas.outOfBounds.start.w}
                    height={ROW_HEIGHT}
                    fill="url('#closure1')"
                    {...rectProps}
                />
                <rect
                    transform={`translate(${Canvas.outOfBounds.end.x},0)`}
                    width={Canvas.outOfBounds.end.w}
                    height={ROW_HEIGHT}
                    fill="#fff"
                    {...rectProps}
                />
                <rect
                    transform={`translate(${Canvas.outOfBounds.end.x},0)`}
                    width={Canvas.outOfBounds.end.w}
                    height={ROW_HEIGHT}
                    fill="url('#closure1')"
                    {...rectProps}
                />
            </g>
        );
    }
);

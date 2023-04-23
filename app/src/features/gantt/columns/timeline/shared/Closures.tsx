import { PatternLines } from "@visx/pattern";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { ROW_HEIGHT } from "gantt/constants";

const Closures = observer(() => {
    const {
        Gantt: { Timeline: {Intervals}, Dimensions },
    } = useWorkpackage();

    return (
        <svg
            width={Dimensions.timelineWidth}
            height={ROW_HEIGHT}
            style={{ position: "absolute", left: 0, top: 0 }}
        >
            <PatternLines
                id="closure"
                height={5}
                width={5}
                stroke={"#28282830"}
                strokeWidth={1}
                orientation={["diagonal"]}
            />
            {Intervals.closures.map((c, i) => (
                <g transform={`translate(${c.x}, 0)`}>
                    <rect
                        fill="url('#closure')"
                        width={c.w}
                        height={ROW_HEIGHT}
                    />
                </g>
            ))}
        </svg>
    );
});

export default Closures;

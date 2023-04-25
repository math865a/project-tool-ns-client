import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";
import { useWorkpackage } from "~/src/state";

export const DeliveryBar = observer(({ Delivery }: { Delivery: Activity }) => {
    const {
        Gantt: {
            Analysis: { PlanningChart: M },
        },
    } = useWorkpackage();

    const x1 = computed(() => M.xScale(Delivery.Interval.t.s));
    const x2 = computed(() => M.xScale(Delivery.Interval.t.f));
    const w = computed(() => x2.get() - x1.get());
    const y = computed(() => M.yScale(Delivery.id) as number);

    const rightTriangle = computed(() => {
        return [0, M.hBar / 3, 0, M.hBar * 1.125, 0 + 15, M.hBar / 3].join(",");
    });

    const leftTriangle = computed(() => {
        return [
            w.get(),
            M.hBar / 3,
            w,
            M.hBar * 1.125,
            w.get() - 15,
            M.hBar / 3,
        ].join(",");
    });

    return (
        <g
            transform={`translate(${x1.get()},${y.get() + M.spacing / 2})`}
            //onMouseOver={() => onHover(delivery)}
            //onMouseOut={() => onOut()}
        >
            <g tabIndex={0} style={{ outline: "none" }}>
                <rect
                    fill={Delivery.Style.fill}
                    x={0}
                    width={w.get()}
                    y={3}
                    height={M.hBar * 0.55}
                    style={{ userSelect: "none" }}
                />
                <polygon
                    style={{ userSelect: "none" }}
                    points={leftTriangle.get()}
                    fill={Delivery.Style.fill}
                />
                <polygon
                    style={{ userSelect: "none" }}
                    points={rightTriangle.get()}
                    fill={Delivery.Style.fill}
                />
            </g>
        </g>
    );
});

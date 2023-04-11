import type { Modifier } from "@dnd-kit/core";
import _ from "lodash";
import { action } from "mobx";
import { ActivityDataBag } from "./data-bag";


export const restrictToRow: Modifier = action(
    ({
        active,
        transform,
        activatorEvent,
        draggingNodeRect: bar,
        containerNodeRect: row,
        ...rest
    }) => {
        if (!bar || !row) {
            return transform;
        }
        const x = _.round(transform.x, 0);
        const { left: bl, right: br } = bar;
        const { left: rl, right: rr } = row;
        const Bar = (active?.data?.current as ActivityDataBag)?.Bar;
        if (!Bar) return transform;
        const Timeline = Bar.Timeline
        const pad = Timeline.TimelineEvent.throttleStep;
        const calcIntersections = () => {
            if (Bar.event === "move") {
                return {
                    r:
                        rr < br
                            ? undefined
                            : Math.max(br + x - rr + pad, bl + x - rr + pad),
                    l: rl > bl ? undefined : Math.min(bl + x - rl, br + x - rl),
                };
            } else if (Bar.event === "resize-start") {
                return {
                    r: bl + x - rr + pad,
                    l: bl + x - rl,
                };
            } else if (Bar.event === "resize-end") {
                return {
                    r: br + x - rr + pad,
                    l: br + x - rl,
                };
            }
            return {
                r: undefined,
                l: undefined,
            };
        };

        const round = ({
            r,
            l,
        }: {
            r: number | undefined;
            l: number | undefined;
        }) => {
            return {
                r: r ? _.round(r, 0) : undefined,
                l: l ? _.round(l, 0) : undefined,
            };
        };

        const { r, l } = round(calcIntersections());
        let tx = x;

        if (l !== undefined && l < pad) {
            tx = _.round(x - (l - pad), 0);
        } else if (r !== undefined && r >= -pad) {
            tx = _.round(x - r, 0);
        }
        return {
            ...transform,
            x: tx,
        };
    }
);

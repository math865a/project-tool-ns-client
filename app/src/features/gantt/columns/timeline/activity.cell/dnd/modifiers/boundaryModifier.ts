import { Modifier } from "@dnd-kit/core";
import { action } from "mobx";
import { ActivityDataBag } from "./data-bag";
interface ID {
    rr?: number;
    rl?: number;
    ll?: number;
    lr?: number;
}
export const boundarySensor: Modifier = action(
    ({
        active,
        transform,
        containerNodeRect: row,
        draggingNodeRect: bar,
    }) => {
        const Bar = (active?.data?.current as ActivityDataBag)?.Bar;

        if (!row || !bar || !Bar) return transform;
        const { x } = transform;

        const TE = Bar.Timeline;

        const calcRR = () => {
            return Math.min(
                Math.abs(bar.right + x - row.right),
                TE.slideZoneWidth
            );
        };

        const calcLR = () => {
            return Math.min(
                Math.abs(bar.left + x - row.right),
                TE.slideZoneWidth
            );
        };

        const calcLL = () => {
            return Math.min(
                Math.max(bar.left + x - row.left, 0),
                TE.slideZoneWidth
            );
        };

        const calcRL = () => {
            return Math.min(
                Math.max(bar.right + x - row.left, 0),
                TE.slideZoneWidth
            );
        };

        const calcIntersections = () => {
            let d: ID = {};
            if (Bar.event === "move") {
                d.rr = calcRR();
                d.ll = calcLL();
            } else if (Bar.event === "resize-start") {
                d.lr = calcLR();
                d.ll = calcLL();
            } else if (Bar.event === "resize-end") {
                d.rr = calcRR();
                d.rl = calcRL();
            }
            return d;
        };

        const calcRate = (d: number) => {
            if (d === 0) return 0;
            return d - TE.slideZoneWidth;
        };

        const { rr, rl, lr, ll } = calcIntersections();
        let r = 0;
        if (x > 0) {
            if (rr) r = -calcRate(rr);
            if (lr) r = -calcRate(lr);
        } else if (x < 0) {
            if (rl) r = calcRate(rl);
            if (ll) r = calcRate(ll);
        }
        TE.TimelineEvent.updateRate(r);
        return transform;
    }
);

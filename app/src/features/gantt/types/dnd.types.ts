export type Position = {
    x1: number;
    x2: number;
};
export type Coord = {
    x: number;
    w: number;
};
export type Delta = {
    dx: number;
    dw: number;
};
export type TimelineEventType = "move" | "resize-start" | "resize-end";
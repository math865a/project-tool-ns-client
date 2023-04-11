export enum Granularity {
     d = "Day",
    w = 'Week',
    m = 'Month',
    q = 'Quarter',
}

export const ROW_HEIGHT = 50;
export const HEADER_HEIGHT = 35;

export const MILESTONE_BAR_FILL = 0.55;
export const TASK_BAR_FILL = 0.55;
export const DEFAULT_DPX = 4;

export const TASK_BAR_HEIGHT = TASK_BAR_FILL * ROW_HEIGHT;
export const MILESTONE_BAR_HEIGHT = MILESTONE_BAR_FILL * ROW_HEIGHT;

export const TIMELINE = 'timeline';
export const TIMELINE_PADDING = 0.2;

export const TICK_HEIGHT = 17.5;

export const GRANULARITY_THRESHOLDS = {
    [Granularity.d]: 45,
    [Granularity.w]: 8,
    [Granularity.m]: 2,
    [Granularity.q]: 0,
};

export const HANDLE_WIDTH = 15;
export const TOOLBAR_HEIGHT = 60;

export interface IGanttColumns {
    __tree_data_group__: number;
    sequence: number;
    dragHandle: number;
    wbs: number;
    identity: number;
    period: number;
    duration: number;
    work: number;
    team: number;
    timeline: number;
}

export type GanttColumn = keyof IGanttColumns
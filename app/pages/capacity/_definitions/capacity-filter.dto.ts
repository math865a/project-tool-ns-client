import { Bound, RowMode, ViewMode } from "@math865a/project-tool.types";

export declare class CapacityFilterDto {
    public readonly rowMode: RowMode;
    public readonly viewMode: ViewMode;
    public readonly bounds: Bound[];
    public readonly rows: string[];
}

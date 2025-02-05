import { RowMode } from "~/pages/capacity/_definitions/row-mode";
import { ViewMode } from "~/pages/capacity/_definitions/view-mode";
import { Bound } from "~/pages/capacity/_definitions/bound";

export declare class CapacityFilterDto {
    public readonly rowMode: RowMode;
    public readonly viewMode: ViewMode;
    public readonly bounds: Bound[];
    public readonly rows: string[];
}

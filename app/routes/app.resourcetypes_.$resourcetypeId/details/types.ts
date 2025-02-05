import { UseFormReturn } from "react-hook-form";
import { ResourceTypeNode } from "~/src";

export type ResourceTypeEditValues = Omit<
    ResourceTypeNode,
    "id" | "category"
> & {
    resourceTypeId: string;
};
export type ResourceTypeEditForm = UseFormReturn<ResourceTypeEditValues>;

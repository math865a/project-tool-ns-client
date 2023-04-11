import { ResourceTypeNode } from "@math865a/project-tool.types"
import { UseFormReturn } from "react-hook-form"

export type ResourceTypeEditValues = Omit<ResourceTypeNode, "id" | "category"> & {resourceTypeId: string}
export type ResourceTypeEditForm = UseFormReturn<ResourceTypeEditValues>
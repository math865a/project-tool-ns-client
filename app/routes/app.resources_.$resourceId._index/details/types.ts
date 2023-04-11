import { UpdateResourceDetailsDto } from "@math865a/project-tool.types"
import { UseFormReturn } from "react-hook-form"

export type ResourceEditValues =  Omit<UpdateResourceDetailsDto, "isProjectManager">
export type ResourceEditForm = UseFormReturn<ResourceEditValues>
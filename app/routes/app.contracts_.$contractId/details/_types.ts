import { ContractNode } from "@math865a/project-tool.types"
import { UseFormReturn } from "react-hook-form"

export type EditValues = Omit<ContractNode, "id"> & {contractId: string}
export type EditForm = UseFormReturn<EditValues>
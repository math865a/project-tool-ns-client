import { UseFormReturn } from "react-hook-form";
import { ContractNode } from "~/src";

export type EditValues = Omit<ContractNode, "id"> & { contractId: string };
export type EditForm = UseFormReturn<EditValues>;

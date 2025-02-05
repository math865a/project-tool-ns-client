import { UseFormReturn } from "react-hook-form";

export type ResourceEditValues = Omit<any, "isProjectManager">;
export type ResourceEditForm = UseFormReturn<ResourceEditValues>;

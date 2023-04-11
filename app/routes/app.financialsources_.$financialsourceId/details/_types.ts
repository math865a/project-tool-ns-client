import { UseFormReturn } from "react-hook-form"

export type FinancialSourceEditValues = {financialSourceId: string, name: string}
export type FinancialSourceEditForm = UseFormReturn<FinancialSourceEditValues>
import { CreateResourceTypeDto, FormOption } from "@math865a/project-tool.types";
import { CreateValues } from "./types";

export function getDefaultValues(record: CreateResourceTypeDto): CreateValues {
    return {
        resources: [] as FormOption[],
        typeNo: undefined,
        contract: record.contract,
        salesDefault: record.salesDefault,
        salesOvertime: record.salesOvertime,
        abbrevation: record.abbrevation,
        name: record.name,
    }
}
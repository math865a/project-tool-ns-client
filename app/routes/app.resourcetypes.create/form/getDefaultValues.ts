import { CreateValues } from "./types";

export function getDefaultValues(record: any): CreateValues {
    return {
        resources: [] as any[],
        typeNo: undefined,
        contract: record.contract,
        salesDefault: record.salesDefault,
        salesOvertime: record.salesOvertime,
        abbrevation: record.abbrevation,
        name: record.name,
    };
}

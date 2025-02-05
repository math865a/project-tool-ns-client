import { ResourceTypeNode } from "~/src";

export function getDefaultValues(node: ResourceTypeNode) {
    const { name, abbrevation, salesDefault, salesOvertime, typeNo, id } = node;
    return {
        name,
        abbrevation,
        salesDefault,
        salesOvertime,
        typeNo,
        resourceTypeId: id,
    };
}

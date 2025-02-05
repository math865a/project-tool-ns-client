import { ResourceNode } from "~/src";

export function getDefaultValues(node: ResourceNode) {
    const { id, name, initials, costDefault, costOvertime } = node;
    return {
        name,
        initials,
        costDefault,
        costOvertime,
        resourceId: id,
    };
}

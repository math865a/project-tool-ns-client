import { ContractNode } from "~/src";

export function getDefaultValues(node: ContractNode) {
    const { name, abbrevation, id } = node;
    return {
        name,
        abbrevation,
    };
}

import { ContractNode } from "@math865a/project-tool.types";

export function getDefaultValues(node: ContractNode) {
    const { name, abbrevation, id } = node;
    return {
        name,
        abbrevation,
    };
}

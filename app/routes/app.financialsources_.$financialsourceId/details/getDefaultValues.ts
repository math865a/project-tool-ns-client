import { FinancialSourceNode } from "@math865a/project-tool.types";

export function getDefaultValues(node: FinancialSourceNode) {
    const { name, id } = node;
    return {
        name
    };
};

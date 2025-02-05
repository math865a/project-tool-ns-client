import { FinancialSourceNode } from "~/src";

export function getDefaultValues(node: FinancialSourceNode) {
    const { name, id } = node;
    return {
        name,
    };
}

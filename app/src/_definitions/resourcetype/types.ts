import { ContractNode } from "~/src";

export interface ResourceTypeNode {
    id: string;
    name: string;
    abbrevation: string;
    typeNo: number;
    salesDefault: number;
    salesOvertime: number;
}

export interface ResourceTypeProfile {
    node: ResourceTypeNode;
    resources: any[];
    contract: ContractNode;
}

export type CreateValues = Omit<any, "id" | "resources" | "typeNo"> & {
    resources: any[];
    typeNo: string | undefined;
};

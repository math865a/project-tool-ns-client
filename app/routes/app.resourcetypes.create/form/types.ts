import { CreateResourceTypeDto, FormOption } from "@math865a/project-tool.types";


export type CreateValues = Omit<CreateResourceTypeDto, "id" | "resources" | "typeNo"> & {
    resources: FormOption[];
    typeNo: string | undefined;
}
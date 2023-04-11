import { createContext, useContext } from "react";
import { Child } from "~/src/design-system";
import { useResourceTypeDeletion } from "./useResourceTypeDeletion";

import RemoveDialog from "./remove-dialog/RemoveDialog";

type Bag = ReturnType<typeof useResourceTypeDeletion>;

const ResourceTypeContext = createContext<Bag | undefined>(undefined);

export default function ResourceTypeProvider({
    children,
}: {
    children: Child[] | Child;
}) {
    const removeProps = useResourceTypeDeletion();

    return (
        <ResourceTypeContext.Provider value={removeProps}>
            {children}
            <RemoveDialog />
        </ResourceTypeContext.Provider>
    );
}

export const useResourceTypeContext = () => {
    const ctx = useContext(ResourceTypeContext);
    if (!ctx) throw new Error("no ctx");
    return ctx;
};

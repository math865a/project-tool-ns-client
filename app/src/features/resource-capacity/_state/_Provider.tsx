import { createContext, useContext } from "react";
import { Child } from "~/src/design-system";
import { useResourceCapacity } from "./_useResourceCapacity";
import invariant from "tiny-invariant";

type Bag = ReturnType<typeof useResourceCapacity>;
const Context = createContext<Bag | undefined>(undefined);

export function ResourceCapacityProvider({
    children,
    resourceId,
}: {
    children?: Child | Child[];
    resourceId: string;
}) {
    const bag = useResourceCapacity(resourceId);
    return <Context.Provider value={bag}>{children}</Context.Provider>;
}

export const useCapacityCharts = () => {
    const bag = useContext(Context);
    invariant(
        bag,
        "useCapacityCharts must be used within a ResourceCapacityProvider"
    );
    return bag;
};

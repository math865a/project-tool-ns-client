import _ from "lodash";
import { useMemo, useState } from "react";
import { IWorkpackageTotalsData } from "./useWorkpackageChartsData";

export const useActiveWorkpackage = (totals: IWorkpackageTotalsData[]) => {
    const [active, setActive] = useState<number>(0);

    const updateActive = (index: number) => setActive(index);

    const activeWorkpackage = useMemo(() => {
        return totals[active];
    }, [totals, active]);

    return {
        active,
        updateActive,
        activeWorkpackage,
    };
};

import { ScaleLinear } from "d3-scale";
import { createContext, useContext } from "react";
import { Child } from "~/src/design-system";
import { useTimeline } from "../hooks/useTimeline";
const ScaleContext = createContext<
    | {
          scale: ScaleLinear<number, number>;
          timelineWidth: number;
          updateTimelineWidth: (width: number) => void;
      }
    | undefined
>(undefined);

export default function ScaleProvider({

    children,
}: {

    children: Child | Child[];
}) {
    const props = useTimeline();

    return (
        <ScaleContext.Provider value={props}>{children}</ScaleContext.Provider>
    );
}

export const useScale = () => {
    const ctx = useContext(ScaleContext);
    if (!ctx) throw new Error("no ctx");
    return ctx;
};

import { Child } from "~/src/design-system";
import { useSummaryState } from "./useSummaryState";
import { createContext, useContext } from "react";

type Bag = ReturnType<typeof useSummaryState>

const Context = createContext<Bag|undefined>(undefined);

export function ScheduleSummaryProvider({children}: {children: Child | Child[]}){

    return(
        <Context.Provider value={useSummaryState()}>
            {children}
        </Context.Provider>
    )

}


export const useSummary = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useSummary must be used within a ScheduleSummaryProvider')
    }
    return context;
}
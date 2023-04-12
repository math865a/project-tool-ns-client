import { PureAbility } from "@casl/ability";
import { createContextualCan, useAbility } from "@casl/react";
import { createContext, useContext } from "react";
import { Ability } from "~/src/_definitions";
import { Child } from "~/src/design-system";
import { Redirector } from "./Redirecter";
import { ISessionContext } from "./types";
import { useSessionState } from "./useSessionState";

const SessionContext = createContext<ISessionContext | undefined>(undefined);
const PermissionsContext = createContext<Ability>(new PureAbility());

export const Can = createContextualCan(PermissionsContext.Consumer);
export function SessionContextProvider({
    children,
}: {
    children: Child | Child[];
}) {
    const state = useSessionState();

    return (
        <SessionContext.Provider value={state}>
            <PermissionsContext.Provider value={state.abilities}>
                <Redirector />
                {children}
            </PermissionsContext.Provider>
        </SessionContext.Provider>
    );
}

export const useSession = () => {
    const ctx = useContext(SessionContext);
    if (!ctx) {
        throw new Error("No user context");
    }
    return ctx;
};

export const usePermissions = () => {
    return useAbility(PermissionsContext);
};

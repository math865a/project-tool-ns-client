import { PureAbility } from "@casl/ability";
import { createContextualCan, useAbility } from "@casl/react";
import { createContext, useContext, useEffect } from "react";
import { Child } from "~/src/design-system";
import { Ability } from "~/src/_definitions";
import { ISessionContext } from "./types";
import { useSessionState } from "./useSessionState";
import { useLocation, useNavigate } from "@remix-run/react";

const SessionContext = createContext<ISessionContext | undefined>(undefined);
const PermissionsContext = createContext<Ability>(new PureAbility());

export const Can = createContextualCan(PermissionsContext.Consumer);
export function SessionContextProvider({
    children,
}: {
    children: Child | Child[];
}) {
    const state = useSessionState();
    const location = useLocation();
    const navigate = useNavigate();

/*
    useEffect(() => {
        if (location.pathname === "/app") {
            if (state.user.isProjectManager) {
                navigate("/app/project-manager");
            } else if (state.user.isResource) {
                navigate("/app/schedule");
            } else {
                navigate("/app/capacity");
            }
        }
    }, [location.pathname, state.user.isProjectManager, state.user.isResource]);*/

    return (
        <SessionContext.Provider value={state}>
            <PermissionsContext.Provider value={state.abilities}>
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

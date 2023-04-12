import { useEffect } from "react";
import { usePermissions, useSession } from "./SessionContextProvider";
import { Action, Subject } from "../_definitions";
import { useLocation, useNavigate } from "@remix-run/react";

export function Redirector() {
    const {
        user: { isResource },
    } = useSession();
    const permissions = usePermissions();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/app") {
            if (permissions.can(Action.Read, Subject.Capacity)) {
                navigate("capacity", { replace: true });
            } else if (isResource) {
                navigate("/app/schedule");
            }
        }
    }, [location.pathname, isResource]);

    return null;
}

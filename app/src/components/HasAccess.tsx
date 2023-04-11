import { Can } from "../session-user";
import { Action, Subject } from "../_definitions";
import { Child, Fallback } from "../design-system";

export function HasAccess({
    children,
    to,
}: {
    children: Child | Child[];
    to: Subject;
}) {
    return (
        <Can I={Action.Read} a={to} passThrough>
            {(allowed) => (allowed ? children : <Fallback.AccessDenied />)}
        </Can>
    );
}

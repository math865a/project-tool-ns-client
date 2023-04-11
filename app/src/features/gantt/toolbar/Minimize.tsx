import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { useNavigate } from "@remix-run/react";
import { Action } from "~/src/design-system";

export function Minimize() {
    const navigate = useNavigate()

    const onClose = () => {
        navigate("../")
    };

    return<Action.TextButton text="Luk" icon={faTimes} iconSize={1} onClick={onClose} />
}

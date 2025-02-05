import { useNavigate } from "@remix-run/react";
import { Action } from "~/src/design-system";
import { IconX } from "@tabler/icons-react";

export function Minimize() {
    const navigate = useNavigate();

    const onClose = () => {
        navigate("../");
    };

    return (
        <Action.TextButton
            text="Luk"
            icon={IconX}
            iconSize={1}
            onClick={onClose}
        />
    );
}

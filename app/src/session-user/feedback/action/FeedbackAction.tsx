import { faComment } from "@fortawesome/pro-light-svg-icons";
import { Action } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { FeedbackMenu } from "./FeedbackMenu";

export function FeedbackAction() {
    const { handleOpen, ...menuProps } = useMenuState();

    return (
        <>
            <Action.TextButton
                icon={faComment}
                text="Giv feedback"
                onClick={handleOpen}
            />
            <FeedbackMenu {...menuProps} />
        </>
    );
}

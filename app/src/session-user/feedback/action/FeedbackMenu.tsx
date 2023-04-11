import {
    faBug,
    faCommentLines,
    faCommentPlus
} from "@fortawesome/pro-light-svg-icons";
import { Menu } from "@mui/material";
import { FeedbackType } from "~/src";
import { Directory } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";


export function FeedbackMenu(
    props: Omit<ReturnType<typeof useMenuState>, "handleOpen">
) {

    const handleOpen = (type: FeedbackType) => {
       // handleFeedbackDialogOpen(type);
        props.onClose()
    }

    return (
        <Menu {...props}>
            <Directory.ContextMenuItem
                icon={faBug}
                label="Rapporter en fejl"
                onClick={() => handleOpen("bug")}
                
            />
            <Directory.ContextMenuItem
                icon={faCommentPlus}
                label="Foreslå en ny funktion"
                onClick={() => handleOpen("feature")}
            />
            <Directory.ContextMenuItem
                icon={faCommentLines}
                label="Giv os din mening"
                onClick={() => handleOpen("opinion")}
            />
        </Menu>
    );
}

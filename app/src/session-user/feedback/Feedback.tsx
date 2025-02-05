import { Menu } from "@mui/material";
import { FeedbackType, useSession } from "~/src";
import { Action, Directory } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { IconBug, IconMessage } from "@tabler/icons-react";

export function Feedback() {
    const { handleOpen, ...menuProps } = useMenuState();
    const {
        feedback: { handleOpen: openDialog, FeedbackForm },
    } = useSession();

    const handleDialogOpen = (type: FeedbackType) => {
        openDialog(type);
        menuProps.onClose();
    };

    return (
        <>
            <Action.TextButton
                icon={IconMessage}
                text="Giv feedback"
                onClick={handleOpen}
            />
            <Menu {...menuProps}>
                <Directory.ContextMenuItem
                    icon={IconBug}
                    key={FeedbackType.Bug}
                    label="Rapporter en fejl"
                    onClick={() => handleDialogOpen(FeedbackType.Bug)}
                />
                <Directory.ContextMenuItem
                    icon={IconMessage}
                    key={FeedbackType.Feature}
                    label="Foreslå en ny funktion"
                    onClick={() => handleDialogOpen(FeedbackType.Feature)}
                />
                <Directory.ContextMenuItem
                    icon={IconMessage}
                    key={FeedbackType.Opinion}
                    label="Giv os din mening"
                    onClick={() => handleDialogOpen(FeedbackType.Opinion)}
                />
            </Menu>
            <FeedbackForm />
        </>
    );
}

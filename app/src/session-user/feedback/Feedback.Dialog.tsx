import { Child, ConfirmationDialog, Dialog, FormUI } from "~/src/design-system";
import { useDialogState } from "~/src/hooks";
import { useSession } from "../SessionContextProvider";
import { useFormContext } from "react-hook-form";
import { IconSend } from "@tabler/icons-react";

export function FeedbackDialog({
    title,
    children,
}: {
    title: string;
    children?: Child | Child[];
}) {
    const {
        formState: { isDirty },
        handleSubmit,
    } = useFormContext();

    const {
        feedback: { onClose, open, submitFeedback, fetcher },
    } = useSession();

    const confState = useDialogState();

    const handleClose = () => {
        if (isDirty) {
            confState.handleOpen();
        } else {
            onClose();
        }
    };

    const onConfirmationCancel = () => {
        confState.onClose();
    };

    const onConfirmationAccept = () => {
        confState.onClose();
        onClose();
    };

    return (
        <>
            <Dialog.Modal open={open} onClose={handleClose}>
                <Dialog.Title title={title} />
                <Dialog.Body>{children}</Dialog.Body>
                <Dialog.Footer>
                    <FormUI.Actions
                        onCancel={() => handleClose()}
                        confirmText="Indsend"
                        confirmIcon={IconSend}
                        onSubmit={handleSubmit(submitFeedback)}
                        confirmColor="inherit"
                        confirmDisabled={fetcher.state === "loading"}
                        cancelDisabled={fetcher.state === "loading"}
                    />
                </Dialog.Footer>
            </Dialog.Modal>
            <ConfirmationDialog
                onCancel={onConfirmationCancel}
                onConfirm={onConfirmationAccept}
                {...confState}
                title="Du har foretaget ændringer som ikke er gemt"
                text="Vil du annullere dine ændringer?"
            />
        </>
    );
}

import { useMemo } from "react";
import { ConfirmationDialog, Dialog } from "~/src/design-system";
import { useDialogState } from "~/src/hooks";
import { BugForm } from "./bug";
import { OpinionForm } from "./opinion";
import { useFeedback } from "../useFeedback";

export interface IFeedbackFormProps {
    onSubmit: ReturnType<typeof useFeedback>["onSubmit"];
    onClose: (isDirty: boolean) => void
}

export function FeedbackFormDialog({
    onSubmit,
    type,
    onClose,
    ...dialogProps
}: Omit<ReturnType<typeof useFeedback>, "handleOpen">) {
    const confState = useDialogState();

    const handleClose = (isDirty: boolean) => {
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

    const Form = useMemo(() => {
        if (type === "opinion") {
            return <OpinionForm onSubmit={onSubmit} onClose={handleClose} />;
        } else if (type === "bug") {
            return <BugForm onSubmit={onSubmit} onClose={handleClose} />;
        }
        return <></>;
    }, [type, onSubmit, handleClose]);

    return (
        <Dialog.Modal {...dialogProps} onClose={onClose} disableCloseOnClickAway>
            {Form}
            <ConfirmationDialog
                onCancel={onConfirmationCancel}
                onConfirm={onConfirmationAccept}
                {...confState}
                title="Du har foretaget ændringer som ikke er gemt"
                text="Vil du annullere dine ændringer?"
            />
        </Dialog.Modal>
    );
}

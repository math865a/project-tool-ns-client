import { useState } from "react";
import { Socket } from "socket.io-client";
import { useDialogState } from "~/src/hooks/useDialog";

export type FeedbackType = "opinion" | "bug" | "feature";

export const useFeedback = (socket?: Socket) => {
    const { handleOpen: handleDialogOpen, onClose, open } = useDialogState();

    const [type, setType] = useState<FeedbackType | null>(null);

    const handleOpen = (type: FeedbackType) => {
        setType(type);
        handleDialogOpen();
    };

    const handleClose = () => {
        setType(null);
        onClose();
    }

    const onSubmit = (values: any) => {
        socket?.emit("feedback", { data: values, type });
    };

    const updateType = (type: FeedbackType) => setType(type)

    return {
        onSubmit,
        handleOpen,
        onClose: handleClose,
        type,
        open,
        updateFeedbackType: updateType
    };
};



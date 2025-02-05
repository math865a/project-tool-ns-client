import { Box } from "@mui/material";
import { useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { FeedbackType } from "~/src/_definitions/feedback";
import { useNotifications } from "~/src/components";
import { useDialogState } from "~/src/hooks/useDialog";
import { toFormData } from "~/util";
import { BugForm } from "./Feedback.Bug";
import { OpinionForm } from "./Feedback.Opinion";
import { FeatureForm } from "./Feedback.Feature";
import { FormResponse } from "~/src";

export const useFeedback = (socket?: Socket) => {
    const { handleOpen: handleDialogOpen, onClose, open } = useDialogState();
    const location = useLocation();
    const { notifyResponse } = useNotifications();

    const fetcher = useFetcher<FormResponse>();

    const [type, setType] = useState<FeedbackType | null>(null);

    const handleOpen = (type: FeedbackType) => {
        setType(type);
        handleDialogOpen();
    };

    const handleClose = () => {
        setType(null);
        onClose();
    };

    const submitFeedback = (values: any) => {
        console.log(values);
        if (!type) {
            throw new Error("No feedback type selected");
        }
        const submission = {
            type: type.toString(),
            pageUrl: location.pathname,
            submission: values,
        };

        fetcher.submit(toFormData(submission), {
            action: "/app/feedback",
            method: "POST",
        });
    };

    useEffect(() => {
        if (
            fetcher.state === "idle" &&
            fetcher.type === "done" &&
            fetcher.data &&
            type !== null
        ) {
            notifyResponse(fetcher.data);
            handleClose();
        }
    }, [fetcher.state, null, fetcher.type, fetcher.data, notifyResponse]);

    const updateType = (type: FeedbackType) => setType(type);

    const Form = useMemo(() => {
        switch (type) {
            case FeedbackType.Bug:
                return BugForm;
            case FeedbackType.Opinion:
                return OpinionForm;
            case FeedbackType.Feature:
                return FeatureForm;
            default:
                return Box;
        }
    }, [type]);

    return {
        submitFeedback,
        fetcher: fetcher,
        handleOpen,
        onClose: handleClose,
        type,
        open,
        updateFeedbackType: updateType,
        FeedbackForm: Form,
    };
};

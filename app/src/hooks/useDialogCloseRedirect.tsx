import { useNavigate } from "@remix-run/react";

export const useDialogCloseRedirect = (
    to?: string,
    sideEffects?: () => void
) => {
    const navigate = useNavigate()

    const handleClose = () => {
        sideEffects && sideEffects();
        if (to){
            navigate(to)
        } else {
            navigate(-1)
        }


    };

    return handleClose;
};

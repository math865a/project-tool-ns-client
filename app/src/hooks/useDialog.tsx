import { useState } from "react"


export const useDialogState = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    return {
        open,
        handleOpen,
        onClose
    }

}
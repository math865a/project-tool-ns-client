import { useState } from "react";

export interface IUseMenuProps<Element extends HTMLElement = any> {
    anchorEl: Element | null;
    open: boolean;
    onClose: () => void;
    handleOpen: (
        event: React.MouseEvent<Element, MouseEvent>,
        anchorEl?: Element | null
    ) => void;
}

export const useMenuState = <Element extends HTMLElement = any>(): IUseMenuProps<Element> => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (
        event: React.MouseEvent<Element, MouseEvent>,
        anchorEl?: Element | null
    ) => {
        setAnchorEl((prev) => (prev ? null : anchorEl ? anchorEl : event.currentTarget));
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    return {
        anchorEl,
        open,
        handleOpen,
        onClose,
    };
};

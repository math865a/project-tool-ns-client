import { PopoverPosition } from "@mui/material";
import { useState } from "react";
export type AnchorPosition = { x: number; y: number };
export interface IUseContextMenuProps<T extends any = any> {
    anchorPosition: PopoverPosition | undefined;
    open: boolean;
    onClose: () => void;
    handleOpen: (record: T, coord: PopoverPosition) => void;
    record: T | null;
    anchorReference: "anchorPosition";
}

export const useContextMenu = <T extends any>(): IUseContextMenuProps<T> => {
    const [record, setRecord] = useState<T | null>(null);
    const [anchorPosition, setAnchorPosition] = useState<PopoverPosition | undefined>(
        undefined
    );
    const open = Boolean(anchorPosition);

    const handleOpen = (record: T, coord: PopoverPosition) => {
        console.log(record)
        setRecord(record);
        setAnchorPosition(coord);
    };

    const onClose = () => {
        setRecord(null);
        setAnchorPosition(undefined);
    };

    return {
        record,
        anchorPosition,
        open,
        handleOpen,
        onClose,
        anchorReference: "anchorPosition"
    };
};

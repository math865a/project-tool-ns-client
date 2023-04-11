import { ButtonBase, Tooltip } from "@mui/material";
import { defaultColors } from "./defaultColors";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ColorPickerMenu from "./color-picker-menu";
import { ColorPickerOption } from "./color-picker-option";

export interface IColorPickerControlProps {
    colors?: string[];
    name: string;
    size?: number;
    spacing?: number;
    disabled?: boolean;
}

export function ColorPickerControl({
    colors = defaultColors,
    name,
    size = 25,
    spacing = 2,
    disabled,
}: IColorPickerControlProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const { setValue, control } = useFormContext();
    const color: string = useWatch({
        control,
        name,
    });

    const onSelect = (color: string) => {
        setAnchorEl(null);
        setValue(name, color, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (disabled) {
        return <ColorPickerOption color={color} size={size} disabled={disabled}/>;
    }

    return (
        <>
            <Tooltip title="Rediger">
                <ButtonBase
                    sx={{ maxWidth: "min-content", maxHeight: "min-content" }}
                    onClick={(event) =>
                        setAnchorEl((prev) =>
                            prev ? null : event.currentTarget
                        )
                    }
                >
                    <ColorPickerOption color={color} size={size}  />
                </ButtonBase>
            </Tooltip>
            <ColorPickerMenu
                open={open}
                onClose={handleClose}
                onChange={onSelect}
                color={color}
                size={size}
                colors={colors}
                spacing={spacing}
                anchorEl={anchorEl}
            />
        </>
    );
}

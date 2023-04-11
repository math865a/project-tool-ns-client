import { Box, Paper } from "@mui/material";

export interface IColorPickerOption {
    color: string;
    size?: number;
    isSelected?: boolean;
    onSelect?: (color: string) => void;
    spacing?: number;
    borderRadius?: number | string;
    disabled?: boolean;
}

export function ColorPickerOption({
    color,
    size = 25,
    isSelected = false,
    onSelect,
    spacing = 2,
    borderRadius = 1,
    disabled,
}: IColorPickerOption) {
    return (
        <Box
            width={size}
            height={size}
            minWidth={size}
            minHeight={size}
            borderRadius={borderRadius}
            component={Paper}
            variant="outlined"
            sx={{
                backgroundColor: disabled ? color + 60 : color,
                cursor: disabled ? "default" : "pointer",
                m: `${spacing}px`,
                border: isSelected ? "1px solid #282828" : "none",
            }}
            onClick={
                disabled ? undefined : () => (onSelect ? onSelect(color) : null)
            }
        />
    );
}

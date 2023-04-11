import { defaultColors } from './defaultColors';
import { Box, Menu, MenuProps } from '@mui/material';
import _ from 'lodash';
import { useMemo } from 'react';
import { ColorPickerOption } from './color-picker-option';

type ColorPickerMenuProps = Omit<MenuProps, 'open' | 'anchorEl' | 'onClose' | 'onChange'> & {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  colors?: string[];
  size?: number;
  spacing?: number;
  color: string;
  onChange: (color: string) => void;
  borderRadius?: string | number;
};
export default function ColorPickerMenu({
  open,
  anchorEl,
  onClose,
  colors = defaultColors,
  size = 25,
  spacing = 2,
  color,
  onChange,
  borderRadius = 1,
  ...menuProps
}: ColorPickerMenuProps) {
  const width = useMemo(
    () => (Math.ceil(colors.length / 2) + 1) * (size + spacing) - spacing,
    [spacing, colors, size],
  );

  return (
        <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            MenuListProps={{ sx: { py: `${spacing}px`, ...menuProps?.MenuListProps } }}
            PaperProps={{
              sx: {
                width,
                backgroundColor: '#ffffff',
                px: `${spacing}px`,
                m: 0,
                py: 0,
                borderRadius: 3,
                ...menuProps?.PaperProps,
              },
            }}
            {... _.omit(menuProps, ['PaperProps', 'MenuListProps'])}
        >
            <Box
                maxWidth={width}
                width={width}
                display="flex"
                alignItems="center"
                flexWrap="wrap"
            >
                {colors.map((d) => (
                    <ColorPickerOption
                        color={d}
                        isSelected={d === color}
                        onSelect={onChange}
                        size={size}
                        spacing={spacing}
                        key={d}
                        borderRadius={borderRadius}
                    />
                ))}
            </Box>
        </Menu>
  );
}

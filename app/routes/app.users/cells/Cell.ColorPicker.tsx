import {
    GridRenderEditCellParams,
    useGridApiContext,
} from "@mui/x-data-grid-pro";
import { UserRow } from "../definitions";
import { ButtonBase, Tooltip } from "@mui/material";
import { useMenuState } from "~/src/hooks/useMenu";
import { ColorPickerOption } from "~/src/design-system";
import ColorPickerMenu from "~/src/design-system/controls/color-picker/color-picker-menu";

export default function ColorPickerCell({
    field,
    id,
    value,
}: GridRenderEditCellParams<UserRow, string>) {
    const { handleOpen, ...menuProps } = useMenuState();

    const apiRef = useGridApiContext();

    const handleChange = (color: string) => {
        apiRef.current.setEditCellValue({ id, field, value: color });
        menuProps.onClose()
    };

    return (
        <>
            <Tooltip title="Vælg farve">
                <ButtonBase
                    sx={{ maxWidth: "min-content", maxHeight: "min-content" }}
                    onClick={handleOpen}
                >
                    <ColorPickerOption color={value ?? ""} />
                </ButtonBase>
            </Tooltip>
            <ColorPickerMenu
                {...menuProps}
                onChange={handleChange}
                color={value ?? ""}
            />
        </>
    );
}

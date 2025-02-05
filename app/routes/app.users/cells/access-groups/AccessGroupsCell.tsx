import { useHover } from "@mantine/hooks";
import { Box, Menu } from "@mui/material";
import {
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    useGridApiContext,
} from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { Action } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import AccessGroupsPicker from "./AccessGroupsPicker";
import { AccessGroupsDisplay } from "./Display";
import { IconPencil } from "@tabler/icons-react";

export interface AccessGroupsCellProps {
    id: GridRowId;
    value: string[];
    field: string;
    rowModesModel: GridRowModesModel;
}

export function AccessGroupsCell(props: AccessGroupsCellProps) {
    const { handleOpen, ...menuProps } = useMenuState();
    const { hovered, ref } = useHover();

    const isEditing = useMemo(() => {
        return props.rowModesModel[props.id]?.mode === GridRowModes.Edit;
    }, [props.rowModesModel, props.id]);

    const apiRef = useGridApiContext();

    const handleToggle = (accessGroupId: string) => {
        const currentVal = props.value ?? [];
        if (currentVal.includes(accessGroupId)) {
            apiRef.current.setEditCellValue({
                id: props.id,
                field: props.field,
                value: currentVal.filter((x) => x !== accessGroupId),
            });
        } else {
            apiRef.current.setEditCellValue({
                id: props.id,
                field: props.field,
                value: [...currentVal, accessGroupId],
            });
        }
    };

    return (
        <>
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                ref={ref}
                height={55}
            >
                <AccessGroupsDisplay
                    {...props}
                    isEditing={isEditing}
                    handleToggle={handleToggle}
                />
                <Box
                    position="absolute"
                    right={20}
                    height={55}
                    display="flex"
                    alignItems="center"
                >
                    {isEditing && (hovered || menuProps.open) && (
                        <Action.Symbol
                            icon={IconPencil}
                            title="Rediger"
                            onClick={handleOpen}
                        />
                    )}
                </Box>
            </Box>
            <Menu
                {...menuProps}
                PaperProps={{
                    sx: {
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        width: "max-content",
                        p: 1,
                    },
                }}
            >
                <AccessGroupsPicker
                    value={props.value}
                    handleToggle={handleToggle}
                />
            </Menu>
        </>
    );
}
